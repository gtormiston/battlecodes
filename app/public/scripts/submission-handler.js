;(function (exports){
  function submissionHandler(submission, testCases, testEngine, generateHTML, playerName) {
    // instance_
    try {
      eval("var solution = " + submission);
    }
    catch(err) {
      return "<h3>Error in solution code:</h3>" +
             "<li>" + err.name + ": " + err.message + "</li>";
    }

    try {
      var testResults = testEngine(solution, testCases);
    }
    catch(err) {
      return "<h3>Error in solution code:</h3>" +
             "<li>" + err.name + ": " + err.message + "</li>";
    }

    socket.emit('playerSubmission', testResults, playerName, socket.roomID);

    return generateHTML(testResults.results);
  }

  exports.submissionHandler = submissionHandler;
})(this);
