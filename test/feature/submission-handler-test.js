var expect = require('chai').expect;
var submissionHandler = require('../../app/public/scripts/submission-handler').submissionHandler;
var testEngine = require('../../app/public/scripts/testing-engine').test;
var generateHTML = require('../../app/public/scripts/generateHTML').generateHTML;
var sinon = require('sinon');

describe('Submission Handler', function() {

  var submission = "function doubler(n) { return n*2; };";
  var testCases = [{ testInput: 2,
                     expectedOutput: 4},
                   { testInput: 3,
                     expectedOutput: 6}];
  var testResults = { pass: true,
                      results: [ { testInput: 2,
                                   expectedOutput: 4,
                                   actualOutput: 4 },

                                 { testInput: 3,
                                   expectedOutput: 6,
                                   actualOutput: 6 } ]
                    };
  var outputHTML = "<h3>2/2 tests passed</h3>" +
                   "<ul>" +
                   "<li>Expected function(2) to return 4, got 4</li>" +
                   "<li>Expected function(3) to return 6, got 6</li>" +
                   "</ul>";

  var socket = { emit: function(){} };
  var mockEmit = sinon.spy(socket, "emit");

  it('returns appropriate html for submission', function(){
    expect(submissionHandler(submission, testCases, testEngine, generateHTML, socket)).to.equal(outputHTML);
  });

  it('sends test outcome to server', function(){
    submissionHandler(submission, testCases, testEngine, generateHTML, socket);
    expect(mockEmit.calledWith('playerSubmission',testResults)).to.equal(true);
  });

});
