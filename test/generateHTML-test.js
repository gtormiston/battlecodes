var expect = require('chai').expect;
var generateHTML = require('../app/lib/generateHTML').generateHTML;

describe('display', function() {

var inputObject = { pass: true,
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
                  "</ul>"

  it('translates objects to appropiate HTML', function(){
    expect(generateHTML(inputObject.results)).to.equal(outputHTML);
  });

});
