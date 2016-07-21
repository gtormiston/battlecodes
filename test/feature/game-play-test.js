var expect = require('chai').expect;
var app = require('../../app/server');
var Browser = require('zombie');

var hostBrowser, opponentBrowser;

describe('Game play', function(){
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

  before(function(next){
    hostBrowser.pressButton('HOST GAME', next);
  });

  before(function(done){
    setTimeout(function(){
      opponentBrowser.pressButton('room-1');
    }, 500);
    done();
  });

  it("can submit a solution and see results", function(done){
    setTimeout(function(){
      hostBrowser.fill('solution', "function test(n) = { return n; };");
      hostBrowser.pressButton('Submit solution');
    }, 800);

    setTimeout(function(){
      expect(hostBrowser.text()).to.contain("tests passed");
      done();
    }, 1500);
  });

});
