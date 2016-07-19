;(function (exports){

  function generateHTML(testResults) {

    var passes = 0;
    var list = "<ul>";

    for (var i = 0; i < testResults.length; i++){
      if(testResults[i].expectedOutput === testResults[i].actualOutput){
        passes++;
      }
      list += "<li>Expected function(" +
              testResults[i].testInput + ") to return " +
              testResults[i].expectedOutput + ", got " +
              testResults[i].actualOutput + "</li>";
    }

    list += "</ul>"
    var header = "<h3>" + passes + "/" + testResults.length +
                 " tests passed</h3>";
    return header + list;
  };

  exports.generateHTML = generateHTML;
})(this);
