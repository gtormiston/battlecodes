(function(exports){
  function init() {
    console.log('hi');

    var socket = io();

    socket.on('new room', function(data){
      console.log('Room available: ' + data);
    });

    socket.on('player joined', function(data){
      console.log('A new player joined room ' + data);
    });
  }

  function hostGame(challengeID){
    socket.emit('hostGame', challengeID);
  }

  function joinGame(roomID){
    socket.emit('joinGame', roomID);
  }

  exports.init = init;
})(this);
