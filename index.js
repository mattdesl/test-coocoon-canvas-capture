var WORDS = ['كل سابق', 'عقبت والكوري', 'كان, و كرسي']
// var WORDS = ['hello', 'dog', 'cat']
var FONT_SIZE = 44

document.body.style.margin = 0

var wordContext = require('2d-context')()
var wordCanvas = wordContext.canvas

var THREE = require('three')
var createOrbitViewer = require('three-orbit-viewer')(THREE)
var app = createOrbitViewer({
  clearColor: 0x000000,
  clearAlpha: 1.0,
  fov: 65,
  position: new THREE.Vector3(1, 1, -2)
})

var geo = new THREE.BoxGeometry(1, 1, 1)
var tex = new THREE.Texture()

var mat = new THREE.MeshBasicMaterial({ transparent: false, map: tex, color: 0xff0000 })
var box = new THREE.Mesh(geo, mat)
app.scene.add(box)

var idx = 0
render(idx)
setInterval(function() {
    idx ++
    render(idx % WORDS.length)
}, 50)

function render (index) {
  var word = WORDS[index]
  wordContext.font = FONT_SIZE + 'px Arial'
  // wordContext.font = FONT_SIZE + 'px Baghdad'
  wordContext.fillStyle = '#FFF'
  // var result = wordContext.measureText(word)

  // var width = result.width
  var div = 16
  // wordCanvas.width = 300
  // wordCanvas.height = 150
  
  wordContext.clearRect(0, 0, wordCanvas.width, wordCanvas.height)
  wordContext.fillText(word, 5, FONT_SIZE)

  tex.image = wordCanvas
  tex.needsUpdate = true
}