var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('hostGame', function(challengeID){
    var roomID = 1;

    socket.join(roomID, function(){
      socket.broadcast.emit('new room', roomID);

      var game = {
        id: roomID,
        host: socket.id,
        challenge: challengeID
      };

      socket.adapter.rooms[roomID].game = game;
    });
  });

  socket.on('joinGame', function(roomID){
    if (socket.adapter.rooms[roomID].length < 2) {
      socket.join(roomID, function(){
        socket.broadcast.emit('player joined', roomID);

        socket.adapter.rooms[roomID].game.opponent = socket.id;
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
