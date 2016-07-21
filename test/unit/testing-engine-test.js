var expect = require('chai').expect;
var test = require('../../app/public/scripts/testing-engine').test;

describe('test', function() {

var doubler = function(n) { return n * 2 };
var brokenDoubler = function(n) { return n * 3 };
var testCases = [{ testInput: 2,
                   expectedOutput: 4},
                 { testInput: 3,
                   expectedOutput: 6}];

  it('correct solution returns appropriate object', function() {
    expect(test(doubler, testCases)).to.eql({
      pass: true,
      results: [ { testInput: 2,
                   expectedOutput: 4,
                   actualOutput: 4 },

                 { testInput: 3,
                   expectedOutput: 6,
                   actualOutput: 6 } ]
    })
  });

  it('incorrect solution returns appropriate object', function() {
    expect(test(brokenDoubler, testCases)).to.eql({
      pass: false,
      results: [ { testInput: 2,
                   expectedOutput: 4,
                   actualOutput: 6 },

                 { testInput: 3,
                   expectedOutput: 6,
                   actualOutput: 9 } ]
    })
  });
});
