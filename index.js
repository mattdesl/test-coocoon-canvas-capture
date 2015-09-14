var equirect = require('google-panorama-equirectangular/intermediate')
var THREE = require('three')
var createOrbitViewer = require('three-orbit-viewer')(THREE)
var bestZoom = require('google-panorama-zoom-level')

var app = createOrbitViewer({
  clearColor: 0xffffff,
  clearAlpha: 1.0,
  fov: 70,
  position: new THREE.Vector3(0, 0, -0.1)
})

var tex = new THREE.DataTexture(null, 1, 1, THREE.RGBAFormat)
tex.minFilter = THREE.LinearFilter
tex.magFilter = THREE.LinearFilter
tex.generateMipmaps = false

// add a double-sided sphere
var geo = new THREE.SphereGeometry(1, 84, 84)
var mat = new THREE.MeshBasicMaterial({
  map: tex,
  side: THREE.DoubleSide
})
var sphere = new THREE.Mesh(geo, mat)
sphere.scale.x = -1

// this looks pretty nice with our data set
sphere.rotation.y = Math.PI/2 - 0.5

app.scene.add(sphere)

render({
  id: 'ZI4ZNb4CDCEUBpGNJRSkaw',
  worldSize: { width: 13312, height: 6656 },
  tileSize: { width: 512, height: 512 }
})

function render (opt) {
  var renderer = app.renderer

  // ensure handle is created
  renderer.uploadTexture(tex)

  var gl = renderer.getContext()
  var handle = tex.__webglTexture
  var texHeight
  var maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
  var zoom = Math.max(0, Math.min(4, bestZoom(maxSize)))
    
  equirect(opt.id, {
    zoom: zoom,
    tiles: {
      worldSize: opt.worldSize,
      tileSize: opt.tileSize
    },
    crossOrigin: 'Anonymous'
  }).on('start', function (data) {
    texHeight = data.height
    
    console.log("Starting...")
    Cocoon.Utils.logMemoryInfo();
    
    // reshape the texture initially with transparent data
    gl.bindTexture(gl.TEXTURE_2D, handle)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, data.width, data.height,
          0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    // now we can show the sphere
    sphere.visible = true
  }).on('progress', function (ev) {
    var x = ev.position[0]
    var y = texHeight - ev.position[1] - ev.image.height

    // now blit the intermediate image
    gl.bindTexture(gl.TEXTURE_2D, handle)
    gl.texSubImage2D(gl.TEXTURE_2D, 0, x, y,
          gl.RGBA, gl.UNSIGNED_BYTE, ev.image)
  }).on('complete', function () {
    console.log("Finished...")
    Cocoon.Utils.logMemoryInfo();
  })
}