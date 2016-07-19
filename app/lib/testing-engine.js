;(function(exports){

  function test(solution, expectations){
    var pass = true;
    var results = [];

    for (var i = 0; i < expectations.length; i++) {
      var solutionOutput = solution(expectations[i].testInput);
      if (solutionOutput !== expectations[i].expectedOutput) {
        pass = false;
      }
      expectations[i].actualOutput = solutionOutput;
      results.push(expectations[i]);
    }

    return {
      pass: pass,
      results: results
    };

  };

  exports.test = test;
})(this);
