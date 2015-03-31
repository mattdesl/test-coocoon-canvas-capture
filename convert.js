var base64 = require('base64-js')
var encode = require('jpeg-js/lib/encoder')
var Context = require('2d-context')
process.argv[1] = 'node'

module.exports = function(gl, opt) {
    opt = opt||{}

    var quality = typeof opt.quality === 'number' ? opt.quality : 80
    var width = opt.width||0
    var height = opt.height||0

    var now = Date.now()
    var array = new Uint8Array(width * height * 4)
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, array)
    console.log("Done gl.readPixels", (Date.now()-now), "ms")

    now = Date.now()
    var ctx = Context({ width: width, height: height })
    var imgData = ctx.createImageData(width, height)
    imgData.data.set(array)
    ctx.putImageData(imgData, 0, 0)
    console.log("Canvas copy", (Date.now()-now), "ms")

    now = Date.now()
    var uri = ctx.canvas.toDataURL('img/jpeg', 0.9)
    console.log("toDataURL", (Date.now()-now), "ms")
    return uri

    // now = Date.now()
    // var jpg = encode({
    //     width: width,
    //     height: height,
    //     data: array
    // }, Math.floor(quality * 100))
    // console.log("Done encode", (Date.now()-now), "ms")

    // now = Date.now()
    // var uri = 'data:image/jpeg;base64,' + base64.fromByteArray(jpg.data)
    // console.log("Done base64", (Date.now()-now), "ms")
    // return uri
}