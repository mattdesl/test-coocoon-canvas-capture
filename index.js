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

var target = new THREE.WebGLRenderTarget(512, 512, {
    anisotropy: 0,
    format: THREE.RGBFormat
})
target.generateMipmaps = false;
target.minFilter = THREE.LinearFilter;
target.magFilter = THREE.LinearFilter;

var bg = new THREE.Mesh(new THREE.PlaneGeometry(6,3.5,1), new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('street.png', undefined, ready),
    depthWrite: false
}))
bg.rotation.y = -Math.PI
app.scene.add(bg)

var geo = new THREE.BoxGeometry(1,1,1)
var mat = new THREE.MeshLambertMaterial({ depthTest: false, map: target })
var box = new THREE.Mesh(geo, mat)
box.rotation.x = -2
box.rotation.z = -4
app.scene.add(box)



geo = new THREE.SphereGeometry(1)
mat = new THREE.MeshLambertMaterial({ color: 0xff0000 })
var sphere = new THREE.Mesh(geo, mat)
sphere.position.x = -2
sphere.scale.multiplyScalar(0.25)
app.scene.add(sphere)
 
app.on('tick', function(dt) {
    bg.lookAt(app.camera.position)
})

app.on('render', function() {
    box.visible = false
    app.renderer.render(app.scene, app.camera, target)
    box.visible = true

})

//once texture is loaded...
function ready(tex) {
    tex.generateMipmaps = false
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
}
