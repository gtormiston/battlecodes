;(function (exports){
  function submissionHandler(submission, testCases, testEngine, generateHTML, socket) {
    // instance_
    eval("var solution = " + submission);
    var testResults = testEngine(solution, testCases);

    socket.emit('playerSubmission', testResults);

    return generateHTML(testResults.results);
  }

  exports.submissionHandler = submissionHandler;
})(this);
