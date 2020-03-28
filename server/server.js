const express = require('express');
const http = require('http');
const gameUtil = require('./game');
const PORT = 3000;

const sockets = require('./sockets');

const app = express();
const server = http.createServer(app);
sockets(server);

app.use(express.static('public'));

// server set up
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});