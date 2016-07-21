var editor = CodeMirror.fromTextArea(document.getElementById("solution"), {
  lineNumbers: true,
  matchBrackets: true,
  mode: 'javascript'
});
// creates codemirror editor 


$("#solution-form").submit(function(e){
  var value = editor.getValue();
});
