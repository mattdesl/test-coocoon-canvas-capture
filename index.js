require('./cocoon.js')

require('touches')().on('start', function() {
  console.log("Sharing")
  Cocoon.Social.share( 'Check out my sweet mustang! http://mattdesl.github.io/test-coocoon-canvas-capture/pin.html' );
})