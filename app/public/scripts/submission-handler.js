;(function (exports){
  function submissionHandler(submission, testCases, testEngine, generateHTML, socket, playerName) {
    // instance_
    eval("var solution = " + submission);
    var testResults = testEngine(solution, testCases);

    socket.emit('playerSubmission', testResults, playerName);

    return generateHTML(testResults.results);
  }

  exports.submissionHandler = submissionHandler;
})(this);
