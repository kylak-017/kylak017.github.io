import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById("threejs-canvas");

// Scene
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);  // Append renderer to the body directly

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 10);
scene.add(light);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Load Model
async function loadModel(path) {
    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync(path);
      const model = gltf.scene; // Get the 3D model from the loaded gltf
      scene.add(model);

      

      if(gltf.animations && gltf.animations.length){
        const mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        function animateAnimations(){
            mixer.update(0.01);
            requestAnimationFrame(animateAnimations);

        }
        animateAnimations();
      }
    
    

    } catch (error) {
        console.error('Error loading model:', error);
    }
}

// Usage
const modelPath = '/models/GalaxyS10.gltf'; // Or '/models/my-model.glb' for binary
loadModel(modelPath);



// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.setClearColor(0xffffff, 1); // Dark grey background color
    renderer.render(scene, camera);
    controls.update();
}

animate();
