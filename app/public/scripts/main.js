(function(exports){

  var socket = io();

  socket.on('new room', function(data){
    $('#notices').text('Share the room ID with your friend to start playing! ' + data.roomID);
  });

  socket.on('roomsAvailable', function(data){
    $('#joinButtons').empty();
    for (var i = 0; i < data.rooms.length; i++){
      $('#joinButtons').append('<button name="button">' + data.rooms[i] + '</button>');
    }
  });

  // socket.on('player joined', function(data){
  //   console.log('A new player joined room ' + data.challengeID);
  // });

  $('#hostButton').click(function(){
    socket.emit('hostGame', { challengeID: 5 });
  });

  $('#joinButton').click(function(){
    socket.emit('joinGame', { roomID: 1 });
  });

  exports.init = socket;
})(this);
