import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { auth } from '../firebaseConfig.js';
import { getRedirectResult, getIdToken, onAuthStateChanged } from '../firebaseConfig.js';

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const result = await getRedirectResult(auth);
        if (result) {
            const user = result.user;
            const idToken = await getIdToken(user);

            console.log("User ID Token:", idToken);

            const response = await fetch("http://localhost:3000/verify-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            });


            const data = await response.json();
            if (response.ok) {
               setTimeout(() => window.location.href = '/profile.html', 0);
            } else {
                console.error("Token verification failed:", data);
            }

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Handle token verification and redirection here
                    verifyTokenAndRedirect(user);
                }
            });
        }
    } catch (error) {
        console.error("Error during redirect result handling:", error);
    }


//All Buttons

const about = document.getElementById("about-button");
const inita = document.getElementById("init-button");
const newsletter = document.getElementById("news-button");
const signupBtn = document.getElementById("signup-button");

if(about){
    about.addEventListener("click", () => {
    window.location.href = '/about.html';
    });
}

if(inita){
    inita.addEventListener("click", () => {
    window.location.href = '/inita.html';
    });
}

if(newsletter){
        newsletter.addEventListener("click", () => {
        window.location.href = '/newsletter.html';
        });
    }

});



    
    let camera, scene, renderer, controls, light, loaderText1, loaderText2, loaderText3;

    init();

        

    function init() {

        camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set( 0, 0, 1 );
      
    

    

        scene = new THREE.Scene(); 

        light = new THREE.DirectionalLight( 0xffffff, 10 );
        light.position.set( 0, 0, 1 ).normalize(); //setting the position of the light
        scene.add(light);

        const loaderBack = new THREE.TextureLoader(); //creating a texture loader constructor that is a new instance of that class (OOP)

    

        loaderBack.load ('./models/stars.jpg', function (texture) { //a function of this class function is called
            scene.background = texture; // implementing a function such that the scene's bacgkroyd is set to the the texture brought by the image.
        });
    

        loaderText1 = new FontLoader();
        loaderText1.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {

            const color = new THREE.Color( 0xf7c614 );

            const matDark = new THREE.MeshBasicMaterial( {
                color: color,
                side: THREE.DoubleSide
            } );

            const matLite = new THREE.MeshBasicMaterial( {
                color: color,
                transparent: true,
                opacity: 0,
                side: THREE.DoubleSide
            } );

            const message = 'Scroll to explore more!';

            const shapes = font.generateShapes( message, 150 );

            const geometry = new THREE.ShapeGeometry( shapes );

            geometry.computeBoundingBox();

            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

            geometry.translate( xMid, 0, 0 );

            // make shape ( N.B. edge view not visible )

            const text = new THREE.Mesh( geometry, matLite );
            text.position.z = 100; 
            scene.add( text );

            // make line shape ( N.B. edge view remains visible )

            const holeShapes = [];

            for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ]; //indexing through the shapes

                if ( shape.holes && shape.holes.length > 0 ) { //if the holes exist or if the shape is a hole

                    for ( let j = 0; j < shape.holes.length; j ++ ) {

                        const hole = shape.holes[ j ]; 
                        holeShapes.push( hole ); //holes are pushed into array

                    }

                }

            }

            shapes.push( ...holeShapes ); //pushed into general array of shapes

            const style = SVGLoader.getStrokeStyle( 7, color.getStyle() );

            const strokeText = new THREE.Group();
            strokeText.position.z = 100; // or whatever value you use for text

            for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ];

                const points = shape.getPoints();

                const geometry = SVGLoader.pointsToStroke( points, style );

                geometry.translate( xMid, -10 , -1000 );

                const strokeMesh = new THREE.Mesh( geometry, matDark );
                strokeText.add( strokeMesh );

            }

            scene.add( strokeText );

            render();

        } ); //end load function

        

        const loaderText2 = new FontLoader();
        loaderText2.load( '../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

            const color = new THREE.Color( 0xffb0fb );

            const matDark = new THREE.MeshBasicMaterial( {
                color: color,
                side: THREE.DoubleSide
            } );

            const matLite = new THREE.MeshBasicMaterial( {
                color: color,
                transparent: true,
                opacity: 0,
                side: THREE.DoubleSide
            } );

            const message = 'We are GEMS.\n Girls in Engineering, Mathematics, and Science.';

            const shapes = font.generateShapes( message, 10 );

            const geometry = new THREE.ShapeGeometry( shapes );

            geometry.computeBoundingBox();

            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

            geometry.translate( xMid, geometry.boundingBox.max.y -10, 0 );

            // make shape ( N.B. edge view not visible )

            const text = new THREE.Mesh( geometry, matLite );
            text.position.z = - 150;
            scene.add( text );

            // make line shape ( N.B. edge view remains visible )

            const holeShapes = [];

            for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ]; //indexing through the shapes

                if ( shape.holes && shape.holes.length > 0 ) { //if the holes exist or if the shape is a hole

                    for ( let j = 0; j < shape.holes.length; j ++ ) {

                        const hole = shape.holes[ j ]; 
                        holeShapes.push( hole ); //holes are pushed into array

                    }

                }

            }

            shapes.push( ...holeShapes ); //pushed into general array of shapes

            const style = SVGLoader.getStrokeStyle( 1, color.getStyle() );

            const strokeText = new THREE.Group();

            for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ];

                const points = shape.getPoints();

                const geometry = SVGLoader.pointsToStroke( points, style );

                geometry.translate( xMid, 0, 0 );

                const strokeMesh = new THREE.Mesh( geometry, matDark );
                strokeText.add( strokeMesh );

            }

            scene.add( strokeText );

            render();

        } ); //end load function


        const loaderText3 = new FontLoader();
        loaderText3.load( '../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

            const color = new THREE.Color( 0xffb0fb );

            const matDark = new THREE.MeshBasicMaterial( {
                color: color,
                side: THREE.DoubleSide
            } );

            const matLite = new THREE.MeshBasicMaterial( {
                color: color,
                transparent: true,
                opacity: 0,
                side: THREE.DoubleSide
            } );

            const message = 'Please LOGIN to find out more about us!';

            const shapes = font.generateShapes( message, 10 );

            const geometry = new THREE.ShapeGeometry( shapes );

            geometry.computeBoundingBox();

            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

            geometry.translate( xMid, geometry.boundingBox.max.y -20, 0 );

            // make shape ( N.B. edge view not visible )

            const text = new THREE.Mesh( geometry, matLite );
            text.position.z = - 800;
            scene.add( text );

            // make line shape ( N.B. edge view remains visible )

            const holeShapes = [];

            for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ]; //indexing through the shapes

                if ( shape.holes && shape.holes.length > 0 ) { //if the holes exist or if the shape is a hole

                    for ( let j = 0; j < shape.holes.length; j ++ ) {

                        const hole = shape.holes[ j ]; 
                        holeShapes.push( hole ); //holes are pushed into array

                    }

                }

            }

            shapes.push( ...holeShapes ); //pushed into general array of shapes

            const style = SVGLoader.getStrokeStyle( 1, color.getStyle() );

            const strokeText = new THREE.Group();

            for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ];

                const points = shape.getPoints();

                const geometry = SVGLoader.pointsToStroke( points, style );

                geometry.translate( xMid, 70, -20 );

                const strokeMesh = new THREE.Mesh( geometry, matDark );
                strokeText.add( strokeMesh );

            }

            scene.add( strokeText );

            render();

        } ); //end load function

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( 0, 0, 0 );
        controls.update();

        controls.addEventListener( 'change', render );

        window.addEventListener( 'resize', onWindowResize );

    } // end init


   


  
// Load Model



async function loadModel(path, position = { x: 0, y: 0, z: 0 }, scale) {
    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync(path);
      const model = gltf.scene; // Get the 3D model from the loaded gltf
      model.position.set(position.x, position.y, position.z); // Set the model's position
      model.scale.set(scale, scale, scale);

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





const parent = new THREE.Group();
scene.add(parent);


const earth = './models/globe.glb'; // Or '/models/my-model.glb' for binary
const mercury = './models/mer.glb'; // Or '/models/my-model.glb' for binary
loadModel(earth, { x: 3, y: 0, z: 300 }, 50);
loadModel(mercury, { x: -5, y: 20, z: 350 }, 3);



if (camera.position.z > 0.3) {
    loaderText1.opacity = 0;
}


 function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

    }

    function render() {
        

        renderer.render( scene, camera );

    }

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.setClearColor(0xffffff, 1); // Dark grey background color
    renderer.render(scene, camera);
    controls.update();
}


animate();

