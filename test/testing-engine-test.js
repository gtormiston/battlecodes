var expect = require('chai').expect;
var test = require('../app/lib/testing-engine').test;

describe('test', function() {

var doubler = function(n) { return n * 2 };
var brokenDoubler = function(n) { return n * 3 };

  it('correct solution returns appropriate object', function() {
    expect(test(doubler, [[2,4],[3,6]])).to.eql({
      pass: true,
      results: [[2,4,4],[3,6,6]]
    })
  });

  it('incorrect solution returns appropriate object', function() {
    expect(test(brokenDoubler, [[2,4],[3,6]])).to.eql({
      pass: false,
      results: [[2,4,6],[3,6,9]]
    })
  });
});
