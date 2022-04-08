const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
let player = 0;
//set static folder
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
  player++;
  console.log('Online members: '+ player)
  socket.on('player', () => {
    io.emit('player', player )
  });
  socket.on('disconnect', () => {
    player--;
    io.emit('player', player )
    console.log('Online members: '+ player)
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
