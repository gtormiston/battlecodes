var expect = require('chai').expect;
var app = require('../../app/server');
var Browser = require('zombie');
var hostBrowser = new Browser({ site: 'http://localhost:3000' });
var opponentBrowser = new Browser({ site: 'http://localhost:3000' });

describe('scaffold test', function(){
  before(function(next){
    hostBrowser.visit('/', next);
  });

  before(function(next){
    opponentBrowser.visit('/', next);
  });

  before(function(done){
    hostBrowser.pressButton('HOST GAME', done);
  });

  it('user can host generate a room code', function(done){
    setTimeout(function(){
      expect(hostBrowser.text()).to.contain('Share the room ID with your friend to start playing! 1');
      done();
    }, 1000);
  });

  it('second browser works', function(){
    expect(opponentBrowser.text()).to.contain('Hallo');
  });

});
