var THREE = require('three')
var createOrbitViewer = require('three-orbit-viewer')(THREE)
var convert = require('./convert')

var app = createOrbitViewer({
    clearColor: 0xaaaaaa,
    clearAlpha: 1.0,
    retina: false,
    fov: 65,
    contextAttributes: {
        antialias: false,
        alpha: false,
        devicePixelRatio: 1,
        preserveDrawingBuffer: true
    },
    position: new THREE.Vector3(0, 0, -2)
})

var tex = THREE.ImageUtils.loadTexture(
        require('baboon-image-uri'),
        null,
        ready)

var geo = new THREE.BoxGeometry(2,2,1)
var mat = new THREE.MeshBasicMaterial({ map: tex, color: 0xffffff })
var bg = new THREE.Mesh(geo, mat)
app.scene.add(bg)

var box = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, wireframe: true })
)
box.rotation.x = 1.3
box.rotation.y = 1.3
app.scene.add(box)

function ready() {
    require('touches')().once('start', function() {
        capture()
    })
}

function capture() {
    var target = new THREE.WebGLRenderTarget(1024, 1024)

    app.camera.aspect = target.width/target.height
    app.camera.updateProjectionMatrix()
    app.renderer.render(app.scene, app.camera, target)

    app.renderer.setRenderTarget(target)
    var gl = app.renderer.getContext()
    var b64 = convert(gl, { width: target.width, height: target.height, quality: 0.9 })


    var img = new Image()
    img.onload = function() {

        bg.visible = false
        var tex = new THREE.Texture()
        tex.image = img
        tex.needsUpdate = true
        box.material.map = tex
        box.material.wireframe = false
        box.material.needsUpdate = true
    }
    img.src = b64

    var canvas = app.renderer.domElement
    app.camera.aspect = canvas.width/canvas.height
    app.camera.updateProjectionMatrix()
    
}