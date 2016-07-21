(function(exports){

  $('#content').html($('#intro-template').html());

  var socket = io();

  var playerName;

  socket.on('new room', function(data){
    $('#content').html($('#loading-template').html());
    $('#room-id').text(data.roomID);
  });

  socket.on('roomsAvailable', function(data){
    $('#joinButtons').empty();
    $('#joinButtons').append('<h2>Join a room</h2>');
    for (var i = 0; i < data.rooms.length; i++){
      $('#joinButtons').append('<button class="js-join-button">' + data.rooms[i] + '</button>');
    }
  });

  socket.on('player joined', function(data){
    window.testCases = data.testCases;
    $('#content').html($('#game-template').html());
    $('#joinButtons').html($('#instructions-template').html());
    $('#js-instructions').text(data.instructions);
    socket.roomID = data.roomID;
    console.log(socket.roomID);
    CodeMirror.fromTextArea(document.getElementById("solution"), {
      lineNumbers: true,
      matchBrackets: true,
      mode: 'javascript'
    });
  });

  socket.on('game over', function(data){
    alert(data.winner + " has won!");
  });

  socket.on('set names', function(data){
    $('#competitors').text(data.p1 + " vs. " + data.p2);
  });

  $('.host-button').click(function(){
    if($('#player-name').val() === "") {
      alert("You must enter a name to play")
    }
    else {
      playerName = $('#player-name').val();
      var challengeID = $(this).data('challenge-id');
      socket.emit('hostGame', { challengeID: challengeID, playerName: $('#player-name').val() });
    }
  });

  $('body').on('click', '.js-join-button', function(){
    if($('#player-name').val() === "") {
      alert("You must enter a name to play")
    }
    else {
      playerName = $('#player-name').val();
      socket.emit('joinGame', { roomID: $(this).text(), playerName: $('#player-name').val() });
    }
  });

  $("body").on('submit', '#solution-form', function(e){
    event.preventDefault();
    var submission = $('.js-solution-text').val();
    var testResults = submissionHandler(submission,testCases,test,generateHTML,playerName);
    $('.js-results').html(testResults);
  });

  exports.socket = socket;
})(this);
