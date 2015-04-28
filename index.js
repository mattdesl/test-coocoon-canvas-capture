require('./cocoon.js')

require('touches')().on('start', function() {
  console.log("Sharing")
  Cocoon.Social.share( 'Check out my sweet mustang! http://192.168.1.3:9966/pin.html' );
})