const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
let members = 0;
//set static folder
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {


  socket.on('player', (player) => {  

    members += player;
    console.log('Online members: '+ members)
    io.emit('player', members)
    
  });
  socket.on('disconnect', () => {
    members--;
    if(members < 0){
      members = 0;
    }
    io.emit('player', members )
    console.log('Online members: '+ members)
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
