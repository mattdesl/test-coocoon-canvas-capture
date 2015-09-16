require('./cocoon.js')

// simulating a visual text field ...
var textField = '';

require('touches')()
  .on('start', tapStart)
  
function tapStart() {
  console.log("user starts editing:", textField)
  Cocoon.Dialog.showKeyboard({
      type: Cocoon.Dialog.keyboardType.TEXT,
  },{
      insertText: function(inserted) {
        textField += inserted
        console.log(textField)
      },
      deleteBackward: function() {
        textField.substring(0, textField.length-1)
        console.log(textField)
      },
      done: function() {
        console.log("user entered:", textField)
      },
      cancel: function(){
        console.log("user cancelled")
      }
  });
}