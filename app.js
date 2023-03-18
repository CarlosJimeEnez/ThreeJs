import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'


// Configuracion de la scene: 
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))


const light = new THREE.SpotLight()
light.position.set(50, 50, 50)
scene.add(light)


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)


// Camera: 
camera.position.z = 8
camera.position.y = 2


const renderer = new THREE.WebGLRenderer()
// renderer.physicallyCorrectLights = true
// renderer.shadowMap.enabled = true
// renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


//  Controls: 
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Loaders: 
var Link1 = 0; 
var Link2 = 0;

const loader = new GLTFLoader()
loader.load(
    'models/Links0.glb',
    function (gltf) {
        Link1 = gltf.scene

        // gltf.scene.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         const m = (child as THREE.Mesh)
        //         m.receiveShadow = true
        //         m.castShadow = true
        //     }
        //     if (((child as THREE.Light)).isLight) {
        //         const l = (child as THREE.Light)
        //         l.castShadow = true
        //         l.shadow.bias = -.003
        //         l.shadow.mapSize.width = 2048
        //         l.shadow.mapSize.height = 2048
        //     }
        // })
        scene.add(gltf.scene)
   
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

// Links2
loader.load(
    'models/Link2.glb',
    function (gltf1){
        Link2 = gltf1.scene
        scene.add(gltf1.scene)
        
        Link2.position.z = 10
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

// const stats = Stats()
// document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)
    //model.rotation.x += 90
    
    renderer.render(scene, camera)
}

animate()