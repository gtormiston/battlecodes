(function(exports){

  $('#content').html($('#intro-template').html());

  var socket = io();

  var testCases = [{ testInput: 2,
                     expectedOutput: 4},
                   { testInput: 3,
                     expectedOutput: 6}];

  var playerName;

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
    var testResults = submissionHandler(submission,testCases,test,generateHTML,socket,playerName);
    $('.js-results').html(testResults);
  });

  exports.init = socket;
})(this);
