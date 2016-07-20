var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
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

app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('hostGame', function(challengeID){
    var roomID = 1;

    socket.join(roomID, function(){
      socket.emit('new room', roomID);

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
        socket.emit('player joined', roomID);
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
