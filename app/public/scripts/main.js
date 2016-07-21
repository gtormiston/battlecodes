(function(exports){

  $('#content').html($('#intro-template').html());

  var socket = io();

  var testCases = [{ testInput: 2,
                     expectedOutput: 4},
                   { testInput: 3,
                     expectedOutput: 6}];

  socket.on('new room', function(data){
    $('#content').html($('#loading-template').html());
  });

  socket.on('roomsAvailable', function(data){
    $('#joinButtons').empty();
    for (var i = 0; i < data.rooms.length; i++){
      $('#joinButtons').append('<button class="js-join-button">' + data.rooms[i] + '</button>');
    }
  });

  socket.on('player joined', function(data){
    $('#content').html($('#game-template').html());
    socket.roomID = data.roomID;
  });

  socket.on('game over', function(data){
    alert(data.winner + "has won!");
  });

  $('.host-button').click(function(){
    var challengeID = $(this).data('challenge-id');
    socket.emit('hostGame', { challengeID: challengeID });
  });

  $('body').on('click', '.js-join-button', function(){
    socket.emit('joinGame', { roomID: $(this).text() });
  });

  $('body').on('click', '.js-submit-button', function(event){
    event.preventDefault();
    var testResults = submissionHandler($('.js-solution-text').val(),testCases,test,generateHTML,socket);
    $('.js-results').html(testResults);
  });

  exports.init = socket;
})(this);
