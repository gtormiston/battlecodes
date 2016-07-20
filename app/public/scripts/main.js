(function(exports){

  $('#content').html($('#intro-template').html());

  var socket = io();

  socket.on('new room', function(data){
    $('#content').html($('#loading-template').html());
  });

  socket.on('roomsAvailable', function(data){
    $('#joinButtons').empty();
    for (var i = 0; i < data.rooms.length; i++){
      $('#joinButtons').append('<button class="js-join-button">' + data.rooms[i] + '</button>');
    }
  });

  socket.on('player joined', function(){
    $('#content').html($('#game-template').html());
  });

  $('#hostButton').click(function(){
    socket.emit('hostGame', { challengeID: 5 });
  });

  $('body').on('click', '.js-join-button', function(){
    socket.emit('joinGame', { roomID: $(this).text() });
  });

  exports.init = socket;
})(this);
