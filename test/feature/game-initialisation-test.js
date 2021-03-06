var expect = require('chai').expect;
var app = require('../../app/server');
var Browser = require('zombie');

var hostBrowser, opponentBrowser;

describe('Game initialisation', function(){
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

  it('has no join button if a game is not hosted', function(){
    expect(opponentBrowser.text()).to.not.contain('room-1');
  });

  it('user can generate a room code', function(done){
    hostBrowser.pressButton('HOST GAME');

    setTimeout(function(){
      expect(hostBrowser.text()).to.contain('waiting for opponent');
      expect(opponentBrowser.text()).to.contain('room-1');
      expect(hostBrowser.text('#joinButtons')).to.not.contain('room-1');
      done();
    }, 1000);
  });

  it('game loads when second player joins', function(done){
    opponentBrowser.pressButton('room-1');

    setTimeout(function(){
      hostBrowser.assert.attribute('input','value','Submit solution');
      opponentBrowser.assert.attribute('input','value','Submit solution');
      done();
    }, 1000);
  });
});
