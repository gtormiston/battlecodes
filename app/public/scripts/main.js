(function(exports){

  var socket = io();

  socket.on('new room', function(data){
    console.log('Room available: ' + data);
  });

  socket.on('player joined', function(data){
    console.log('A new player joined room ' + data);
  });

  document.getElementById('hostButton').onclick = function(){
    socket.emit('hostGame', 5);
  };

  document.getElementById('joinButton').onclick = function(){
    socket.emit('joinGame', 1);
  };

  exports.init = socket;
})(this);
