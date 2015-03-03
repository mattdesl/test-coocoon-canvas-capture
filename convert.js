var base64 = require('base64-js')
var encode = require('jpeg-js/lib/encoder')

module.exports = function(gl, opt) {
    opt = opt||{}

    var quality = typeof opt.quality === 'number' ? opt.quality : 80
    var width = opt.width||0
    var height = opt.height||0

    var array = new Uint8Array(width * height * 4)
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, array)
    
    var jpg = encode({
        width: width,
        height: height,
        data: array
    }, Math.floor(quality * 100))
    return 'data:image/jpeg;base64,' + base64.fromByteArray(jpg.data)
}