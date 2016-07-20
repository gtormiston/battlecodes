var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('app/public'));

io.on('connection', function(socket){
  socket.on('hostGame', function(data){
    var roomID = 1;

    socket.join(roomID, function(){
      socket.emit('new room', { roomID: roomID });

      var game = {
        id: roomID,
        host: socket.id,
        challenge: data.challengeID
      };

      socket.adapter.rooms[roomID].game = game;
    });
  });

  socket.on('joinGame', function(data){
    if (socket.adapter.rooms[data.roomID].length < 2) {
      socket.join(data.roomID, function(){
        // socket.emit('player joined', { roomID: data.roomID });
        socket.adapter.rooms[data.roomID].game.opponent = socket.id;
      });
    }
    else {
      console.log("NO");
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
