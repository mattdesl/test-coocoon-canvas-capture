var THREE = require('three')
var createOrbitViewer = require('three-orbit-viewer')(THREE)

var app = createOrbitViewer({
    //ignore retina scaling in canvas-app module
    retina: false,
    //options passed to WebGLRenderer
    contextAttributes: { 
        devicePixelRatio: 1, 
        preserveDrawingBuffer: true, 
        alpha: false 
    },
    fov: 65,
    position: new THREE.Vector3(0, 0, -2)
})
app.controls.noZoom = app.controls.noPan = true
app.renderer.setClearColor(0xaa00ff, 1.0)
 
var light = new THREE.PointLight(0xaaddff, 1.0, 1000)
light.position.set(1, 2, -1)
app.scene.add(light)

var bg = new THREE.Mesh(new THREE.PlaneGeometry(6,3.5,1), new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('street.png', undefined, ready)
}))
bg.rotation.y = -Math.PI
app.scene.add(bg)

var geo = new THREE.BoxGeometry(1,1,1)
var mat = new THREE.MeshLambertMaterial({ depthTest: false })
var box = new THREE.Mesh(geo, mat)
box.rotation.x = -2
box.rotation.z = -4
app.scene.add(box)
 
app.on('tick', function(dt) {
    bg.lookAt(app.camera.position)
})

//once texture is loaded...
function ready() {
    //on first finger tap, do a capture
    require('touches')().once('start', function() {
        console.log("Capturing")
        capture()
        bg.visible = false
    })    
}

function capture() {
    var canvas = app.renderer.domElement
    var oldWidth = canvas.width,
        oldHeight = canvas.height

    var width = 1280,
        height = 600
    canvas.width = width
    canvas.height = height

    app.renderer.setViewport(0, 0, width, height)
    app.camera.aspect = width/height
    app.camera.updateProjectionMatrix()
    app.renderer.clear()
    app.renderer.render(app.scene, app.camera)

    var now = Date.now()
    //snap the image
    var data = canvas.toDataURL('image/jpeg', 0.9)
    console.log("toDataURL", (Date.now()-now), "ms")
    var image = new Image()
    image.onload = function() {
        console.log("image.onload", (Date.now()-now), "ms")
        var tex = new THREE.Texture()
        tex.image = image
        tex.minFilter = THREE.NearestFilter
        tex.magFilter = THREE.NearestFilter
        tex.needsUpdate = true
        box.material = new THREE.MeshBasicMaterial({ map: tex })
    }
    image.src = data
    now = Date.now()

    canvas.width = oldWidth
    canvas.height = oldHeight

    app.renderer.setViewport(0, 0, oldWidth, oldHeight)
    app.camera.aspect = oldWidth/oldHeight
    app.camera.updateProjectionMatrix()
}