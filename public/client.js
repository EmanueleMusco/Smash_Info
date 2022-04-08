var socket = io();
let player = 1;

socket.emit('player', player);

socket.on('player', function (player) {
    let memb = document.getElementById('members');
    memb.innerHTML = "Online Members: " + player;
});
