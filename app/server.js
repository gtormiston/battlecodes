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
        var challengeID = socket.adapter.rooms[data.roomID].game.challenge;
        var testCases = assets.testCases.JS[challengeID];
        var instructions = assets.instructions.JS[challengeID];
        io.to(data.roomID).emit('player joined', { roomID: data.roomID, testCases: testCases, instructions: instructions });
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

////////////////////////////////////////////////////////////////////////////////
//challenge assets (testCases and descriptions) below; we promise these will be
//stored in a separate file and imported upon request, but this is fine for an MVP

var assets = {
              testCases: {
                JS: {
                      1:  [ {testInput: '', expectedOutput: 220752000}],
                      2:  [ {testInput: 1, expectedOutput: 1},
                            {testInput: 2, expectedOutput: 8},
                            {testInput: 3, expectedOutput: 27},
                            {testInput: 10, expectedOutput: 1000},
                            {testInput: 11, expectedOutput: 'Fail!'},
                            {testInput: -5, expectedOutput: 125},
                            {testInput: -11, expectedOutput: 'Fail'}],
                      3:  [ {testInput: 1, expectedOutput: -0.5},
                            {testInput: -7, expectedOutput: -8.5},
                            {testInput: -20, expectedOutput: -21.5},
                            {testInput: 70, expectedOutput: 68.5},
                            {testInput: 10, expectedOutput: 8.5}],
                      4:  [ {testInput: 3, expectedOutput: '3.00'},
                            {testInput: -10, expectedOutput: '-10.00'},
                            {testInput: 18.29834747, expectedOutput: '18.30'},
                            {testInput: -15.39497439, expectedOutput: '-15.39'},
                            {testInput: 22.4999999999999, expectedOutput: '22.00'},
                            {testInput: Infinity, expectedOutput: 'NaN'},
                            {testInput: -Infinity, expectedOutput: 'NaN'}],
                      5:  [ {testInput: 1, expectedOutput: 0},
                            {testInput: 10, expectedOutput: 90},
                            {testInput: 8, expectedOutput: 72},
                            {testInput: 90, expectedOutput: 90},
                            {testInput: -2, expectedOutput: 18}],
                      6:  [ {testInput: 1, expectedOutput: 2}],
                      7:  [ {testInput: 5, expectedOutput: 4799.71},
                            {testInput: 50, expectedOutput: 364028.29},
                            {testInput: 38, expectedOutput: 210757.43},
                            {testInput: 3579, expectedOutput: 1859171007.71}],
                      8:  [ {testInput: 8, expectedOutput: 4},
                            {testInput: 9, expectedOutput: 9},
                            {testInput: 10, expectedOutput: 10},
                            {testInput: 21, expectedOutput: 3},
                            {testInput: 54, expectedOutput: 18},
                            {testInput: 8, expectedOutput: 4},
                            {testInput: 102, expectedOutput: 6},
                            {testInput: 312, expectedOutput: 12},
                            {testInput: 456, expectedOutput: 12},
                            {testInput: 8, expectedOutput: 4},
                            {testInput: 34974, expectedOutput: 18},
                            {testInput: 11, expectedOutput: 1}],
                      9:  [ {testInput: 81, expectedOutput: 9},
                            {testInput: 4, expectedOutput: 2},
                            {testInput: 32, expectedOutput: 5.66},
                            {testInput: 80, expectedOutput: 8.94},
                            {testInput: 64, expectedOutput: 8},
                            {testInput: 121, expectedOutput: 11},
                            {testInput: 45678, expectedOutput: 213.72},
                            {testInput: 50, expectedOutput: 7.07},
                            {testInput: 1, expectedOutput: 1},
                            {testInput: 0, expectedOutput: 0}],
                      10: [ {testInput: 1, expectedOutput: 0},
                            {testInput: 2, expectedOutput: 4},
                            {testInput: 3, expectedOutput: 18},
                            {testInput: 657, expectedOutput: 283161744},
                            {testInput: 21, expectedOutput: 8820},
                            {testInput: 15, expectedOutput: 3150}]
                    }
              },
              instructions: {
                JS: {
                      1:  "Write a function that works out number of seconds in seven years",
                      2:  "Write a function that returns an absolute cubed number no higher than 1000",
                      3:  "Write a function that returns the same number minus 1 and a half",
                      4:  "Write a function that converts a number to a string and rounds down to two decimal places",
                      5:  "Write a function that calculates the lowest common denominator between a given number and nine",
                      6:  "One plus one iiiis ???",
                      7:  "Write a function that calculates a number squared plus eight times five hundred and eight divided by three point five plus nine rounded to three decimal places...plus one (in this order, so ignoring BODMAS)",
                      8:  "Write a function that calculates the greatest common divisor of a given number and nine hundred",
                      9:  "Write a function that returns the square root of a given number (if not a whole number then to 2 decimal places)",
                      10: "Write a function that takes a number y, creates a (y x y) cube, and returns the number of cubes within it, minus the top layer of cubes"
                    }
              }
             }
////////////////////////////////////////////////////////////////////////////////



http.listen(3000, function(){
  console.log('listening on *:3000');
});
