var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sassMiddleware = require('node-sass-middleware');
var srcPath = __dirname + '/sass';
var destPath = __dirname + '/public';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(sassMiddleware({
    src: srcPath,
    dest: destPath,
    debug :true,
    outputStyle: 'compressed'
  }));

app.use(express.static('app/public'));


io.on('connection', function(socket){
  var filteredRooms = [];

  for (room in socket.adapter.rooms){
    if (room.match(/^room/)){
      filteredRooms.push(room);
    }
  }

  socket.emit('roomsAvailable', { rooms: filteredRooms });

  socket.on('hostGame', function(data){
    //var roomID = 'room-' + Math.floor(Math.random() * 1000);
     var roomID = 'room-' + 1;

    socket.join(roomID, function(){
      socket.emit('new room', { roomID: roomID });

      filteredRooms.push(roomID);

      socket.broadcast.emit('roomsAvailable', { rooms: filteredRooms });

      var game = {
        id: roomID,
        host: socket,
        challenge: data.challengeID,
        hostName: data.playerName
      };

      socket.adapter.rooms[roomID].game = game;
    });
  });

  socket.on('joinGame', function(data){
    if (socket.adapter.rooms[data.roomID].length < 2) {
      socket.adapter.rooms[data.roomID].game.opponentName = data.playerName;
      socket.join(data.roomID, function(){
        io.to(data.roomID).emit('player joined', { roomID: data.roomID });
        io.emit('set names', { p1: socket.adapter.rooms[data.roomID].game.hostName, p2: data.playerName });
        socket.adapter.rooms[data.roomID].game.opponent = socket;
      });
    }
    else {
      console.log("NO");
    }
  });

  socket.on('playerSubmission', function(data, playerName){
    if(data.pass) {
      io.emit('game over', { winner: playerName });
      var hostSocket = socket.adapter.rooms[socket.roomID].game.host;
      var opponentSocket = socket.adapter.rooms[socket.roomID].game.opponent;
      hostSocket.leave(socket.roomID);
      opponentSocket.leave(socket.roomID);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
