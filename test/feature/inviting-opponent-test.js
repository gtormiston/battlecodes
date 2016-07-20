var expect = require('chai').expect;
var app = require('../../app/server');
var Browser = require('zombie');

var hostBrowser, opponentBrowser;

describe('scaffold test', function(){
  before(function(){
    hostBrowser = new Browser({ site: 'http://localhost:3000' });
    opponentBrowser = new Browser({ site: 'http://localhost:3000' });
  });

  before(function(next){
    hostBrowser.visit('/', next);
  });

  before(function(next){
    opponentBrowser.visit('/', next);
  });

  it('user can host generate a room code', function(done){
    hostBrowser.pressButton('HOST GAME');

    setTimeout(function(){
      expect(hostBrowser.text()).to.contain('Share the room ID with your friend to start playing! room-1');
      done();
    }, 1000);
  });

  it('second browser works', function(){
    expect(opponentBrowser.text()).to.contain('Hallo');
  });

  it('has no join button if a game is not hosted', function(){
    expect(opponentBrowser.text()).to.not.contain('JOIN GAME');
  });

  it('has a join button if a game is hosted', function(done){
    hostBrowser.pressButton('HOST GAME');
    setTimeout(function(){
      expect(opponentBrowser.text()).to.contain('room-1');
      done();
    }, 1000);
  });
});
