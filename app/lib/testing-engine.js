;(function(exports){
  
  function test(solution, expectations){
    var pass = true;
    var results = [];

    for (var i = 0; i < expectations.length; i++) {
      var solutionOutput = solution(expectations[i][0]);
      if (solutionOutput !== expectations[i][1]) {
        pass = false;
      }
      expectations[i].push(solutionOutput);
      results.push(expectations[i]);
    }

    return {
      pass: pass,
      results: results
    };
  
  };

  exports.test = test;
})(this);
