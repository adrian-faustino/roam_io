// THIS IS THE SERVER SIDE

const SocketIO = require('socket.io');
const gameUtil = require('./game');


// this file exports a function, takes the server and does something with it
module.exports = (server) => {
  const io = SocketIO(server);
  const gameState = {};
  let interval;

  io.on('connection', (client) => {
    console.log(`Connection from client with ID: ${client.id}.`);
    gameState[client.id] = {
      username: 'Anonymous',
      score: 0
    };
    
    // generate and delete circle for everyone
    interval = setInterval(() => {
      const data = {
        coord: gameUtil.randomCoord(),
        uID: gameUtil.circleID()
      };
      io.emit('generateCircle', data);

      setTimeout(() => {
        io.emit('delete', data.uID);
      }, 800);
    }, 800);

    // handle mouse event data
    client.on('coordinate', coord => {
      const data = {
        coord,
        userID: client.id
      }
      io.emit('drawThis', data);
    });

    // when user clicks a circle, it transmit deletion of div with ID to all clients
    client.on('delete', data => {
      io.emit('delete', data);
    });

    // change username of cursor
    client.on('change-username', username => {
      gameState[client.id].username = username;
      const data = {
        username: username,
        userID: client.id
      };
      io.emit('change-username', data);
    });

    // delete on disconnection
    client.on('disconnect', () => {
      delete gameState[client.id];
      clearInterval(interval);
      io.emit('socket-disconnect', client.id);
    });

    // recieve client score and add to DB
    client.on('update-score', data => {
      gameState[client.id].score = data;
    });

    // broadcast gameState
    setInterval(() => {
      io.emit('game-state', gameState);
    }, 1000 / 30);
  });
};