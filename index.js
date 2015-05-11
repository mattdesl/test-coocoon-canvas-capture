require('./cocoon.js')

setTimeout(function() {
  Cocoon.Dialog.showKeyboard({
      type: Cocoon.Dialog.keyboardType.TEXT,
  },{
      insertText: function(inserted) {
        console.log("Insert!", inserted)
      },
      deleteBackward: function() {
        console.log("DELETE")
      },
      done: function() {
        console.log("SUCCESS")
      },
      cancel: function(){
        console.log("CANCEL")
      }
  });
}, 2000)
