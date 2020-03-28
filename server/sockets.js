// THIS IS THE SERVER SIDE

const SocketIO = require('socket.io');


// this file exports a function, takes the server and does something with it
module.exports = (server) => {
  const io = SocketIO(server);

  io.on('connection', (client) => {
    console.log(`Connection from client with ID: ${client.id}.`);

    client.on('coordinate', data => {
      io.emit('drawThis', data);
    });
  });
};