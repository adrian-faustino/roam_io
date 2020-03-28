// THIS IS THE SERVER SIDE

const SocketIO = require('socket.io');
const gameUtil = require('./game');


// this file exports a function, takes the server and does something with it
module.exports = (server) => {
  const io = SocketIO(server);
  const usersDB = {};

  io.on('connection', (client) => {
    console.log(`Connection from client with ID: ${client.id}.`);
    
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

    client.on('coordinate', coord => {
      const data = {
        coord,
        userID: client.id
      }
      io.emit('drawThis', data);
    });

    client.on('delete', data => {
      io.emit('delete', data);
    });
  });
};