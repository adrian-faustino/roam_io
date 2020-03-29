// THIS IS THE SERVER SIDE

const SocketIO = require('socket.io');
const gameUtil = require('./game');


// this file exports a function, takes the server and does something with it
module.exports = (server) => {
  const io = SocketIO(server);
  const gameState = {};

  io.on('connection', (client) => {
    // console.log(`Connection from client with ID: ${client.id}.`);
    gameState[client.id] = { username: 'Anonymous'};
    console.log(gameState);
    
    // generate and delete circle for everyone
    setInterval(() => {
      const data = {
        coord: gameUtil.randomCoord(),
        uID: gameUtil.circleID()
      };
      io.emit('generateCircle', data);

      setTimeout(() => {
        io.emit('delete', data.uID);
      }, 2350);
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
      gameState[client.id] = { username: `${username}` };
      const data = {
        username: username,
        userID: client.id
      };
      io.emit('change-username', data);
    });

    // delete on disconnection
    client.on('disconnect', () => {
      delete gameState[client.id];
      io.emit('socket-disconnect', client.id);
    });

    // broadcast gameState
    setInterval(() => {
      io.emit('game-state', gameState);
    }, 3000);
  });
};