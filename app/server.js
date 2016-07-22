var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sassMiddleware = require('node-sass-middleware');
var srcPath = __dirname + '/sass';
var destPath = __dirname + '/public';
var assets = require('./data/assets');

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
  socket.emit('updateAvailableRooms', { rooms: filteredRooms(socket) });

  socket.on('hostGame', function(data){
    var roomID = 'room-' + Math.floor(Math.random() * 1000);

    socket.join(roomID, function(){
      socket.emit('new room', { roomID: roomID });

      var game = {
        id: roomID,
        challenge: data.challengeID,
        host: socket,
        hostName: data.playerName
      };

      findRoom(socket, roomID).game = game;

      socket.broadcast.emit('updateAvailableRooms', { rooms: filteredRooms(socket) });
    });
  });

  socket.on('joinGame', function(data){
    if (findRoom(socket, data.roomID).length < 2) {
      socket.join(data.roomID, function(){
        var challengeID = findRoom(socket, data.roomID).game.challenge;
        var testCases = assets.testCases.JS[challengeID];
        var instructions = assets.instructions.JS[challengeID];

        io.to(data.roomID).emit('player joined', {
          roomID: data.roomID,
          testCases: testCases,
          instructions: instructions
        });

        io.to(data.roomID).emit('set names', {
          p1: findRoom(socket, data.roomID).game.hostName,
          p2: data.playerName
        });

        findRoom(socket, data.roomID).game.opponentName = data.playerName;
        findRoom(socket, data.roomID).game.opponent = socket;

        socket.broadcast.emit('updateAvailableRooms', { rooms: filteredRooms(socket) });
      });
    }
  });

  socket.on('playerSubmission', function(data, playerName, roomID){
    if(data.pass) {
      io.to(roomID).emit('game over', { winner: playerName });
      var hostSocket = findRoom(socket, roomID).game.host;
      var opponentSocket = findRoom(socket, roomID).game.opponent;
      hostSocket.leave(roomID);
      opponentSocket.leave(roomID);
    }
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});


// HELPER METHODS

function findRoom(socket, roomID){
  return socket.adapter.rooms[roomID];
}

function filteredRooms(socket){
  var rooms = [];

  for (room in socket.adapter.rooms){
    if (room.match(/^room/) && findRoom(socket, room).length < 2){
      rooms.push(room);
    }
  }

  return rooms;
}
