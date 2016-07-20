(function(exports){

  var socket = io();

  socket.on('new room', function(data){
    $('#loading-messages').text('Just waiting for opponent to join' + data.roomID);
  });

  socket.on('roomsAvailable', function(data){
    $('#joinButtons').empty();
    for (var i = 0; i < data.rooms.length; i++){
      $('#joinButtons').append('<button class="js-join-button">' + data.rooms[i] + '</button>');
    }
  });

  $('#hostButton').click(function(){
    socket.emit('hostGame', { challengeID: 5 });
  });

  $('body').on('click', '.js-join-button', function(){
    socket.emit('joinGame', { roomID: $(this).text() });
  });

  exports.init = socket;
})(this);
