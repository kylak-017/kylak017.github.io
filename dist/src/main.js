import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { auth } from './firebaseConfig.js';
import { getRedirectResult, getIdToken, onAuthStateChanged } from './firebaseConfig.js';

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const result = await getRedirectResult(auth);
        if (result) {
            const user = result.user;
            const idToken = await getIdToken(user);

            console.log("User ID Token:", idToken);

            const response = await fetch("/verify-token", {
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

        light = new THREE.DirectionalLight( 0xffffff, 3 );
        light.position.set( 0, 0, 1 ).normalize(); //setting the position of the light
        scene.add(light);
        
        // Add ambient light for better color visibility
        const ambientLight = new THREE.AmbientLight( 0x404040, 1 );
        scene.add(ambientLight);

        const loaderBack = new THREE.TextureLoader(); //creating a texture loader constructor that is a new instance of that class (OOP)

    

        loaderBack.load ('models/stars.jpg', function (texture) { //a function of this class function is called
            scene.background = texture; // implementing a function such that the scene's bacgkroyd is set to the the texture brought by the image.
        });
    

        loaderText1 = new FontLoader();
        loaderText1.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

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

        // Load text near planets
        const loaderText3 = new FontLoader();
        loaderText3.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

            const color = new THREE.Color( 0xd65694 );

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

            const message = 'Orbiting here are the planets of young girls\' dreams... \n Zoom in to look closer!';

            const shapes = font.generateShapes( message, 8 );

            const geometry = new THREE.ShapeGeometry( shapes );

            geometry.computeBoundingBox();

            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
            const yMid = - 0.5 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y );

            geometry.translate( xMid, yMid, 0 );

            // make shape ( N.B. edge view not visible )
            const text = new THREE.Mesh( geometry, matLite );
            text.position.set(0, 50, 300);
            scene.add( text );

            // make line shape ( N.B. edge view remains visible )
            const holeShapes = [];

            for ( let i = 0; i < shapes.length; i ++ ) {
                const shape = shapes[ i ];
                if ( shape.holes && shape.holes.length > 0 ) {
                    for ( let j = 0; j < shape.holes.length; j ++ ) {
                        const hole = shape.holes[ j ]; 
                        holeShapes.push( hole );
                    }
                }
            }

            shapes.push( ...holeShapes );

            const style = SVGLoader.getStrokeStyle( 1, color.getStyle() );

            const strokeText = new THREE.Group();

            for ( let i = 0; i < shapes.length; i ++ ) {
                const shape = shapes[ i ];
                const points = shape.getPoints();
                const geometry = SVGLoader.pointsToStroke( points, style );
                geometry.translate( xMid, yMid, 0 );
                const strokeMesh = new THREE.Mesh( geometry, matDark );
                strokeText.add( strokeMesh );
            }

            strokeText.position.set(0, 90, 300);
            scene.add( strokeText );

            render();

        } ); //end load function

        const logoLoader = new THREE.TextureLoader();
        logoLoader.load('models/main.png', function (texture) {
            // Set texture encoding to sRGB for proper color handling
            texture.encoding = THREE.sRGBEncoding;
            
            // Create logo plane
            const logoGeometry = new THREE.PlaneGeometry(140, 60);
            const logoMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
                color: new THREE.Color(1.5, 1.5, 1.5) // Increase saturation by boosting RGB values
            });
            
            // Create logo mesh and position it
            const logo = new THREE.Mesh(logoGeometry, logoMaterial);
            logo.position.set(0, -15, 5);
            scene.add(logo);
            
            render();
        });

        const loaderText2 = new FontLoader();
        loaderText2.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

            const color = new THREE.Color( 0xd65694 );

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

            const message = '                                 We are \n \n \n \n \n \n \n Girls in Engineering, Mathematics, and Science.';

            const shapes = font.generateShapes( message, 10 );

            const geometry = new THREE.ShapeGeometry( shapes );

            geometry.computeBoundingBox();

            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
            const yMid = - 0.5 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y );

            geometry.translate( xMid, yMid, 0 );

            // make shape ( N.B. edge view not visible )

            const text = new THREE.Mesh( geometry, matLite );
            text.position.set(0, 1500, -150);

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

                geometry.translate( xMid, yMid + 100, -0 );

                const strokeMesh = new THREE.Mesh( geometry, matDark );
                strokeText.add( strokeMesh );

            }

            scene.add( strokeText );

            render();

        } ); //end load function




        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.outputEncoding = THREE.sRGBEncoding; // Set renderer output encoding to sRGB
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
      
      return model; // Return the model for orbital animation

    } catch (error) {
        console.error('Error loading model:', error);
        return null;
    }
}




// Usage

let earthModel, mercuryModel, mer2Model, mer3Model, mer4Model, mer5Model, mer6Model;
let orbitRadius = 100;
let orbitRadius2 = 80; // Different orbit radius for second planet
let orbitRadius3 = 60; // Third planet orbit radius
let orbitRadius4 = 70; // Fourth planet orbit radius
let orbitRadius5 = 95; // Fifth planet orbit radius
let orbitRadius6 = 90; // Sixth planet orbit radius
let orbitSpeed = 0.01;
let orbitSpeed2 = 0.01; // Different speed for second planet
let orbitSpeed3 = 0.01; // Third planet speed
let orbitSpeed4 = 0.01; // Fourth planet speed
let orbitSpeed5 = 0.01; // Fifth planet speed
let orbitSpeed6 = 0.01; // Sixth planet speed
let orbitAngle = 0;
let orbitAngle2 = 10; // Separate angle for second planet
let orbitAngle3 = 45; // Third planet angle
let orbitAngle4 = 90; // Fourth planet angle
let orbitAngle5 = 135; // Fifth planet angle
let orbitAngle6 = 180; // Sixth planet angle

const parent = new THREE.Group();
scene.add(parent);

const earth = 'models/globe.glb';
const mercury = 'models/mer.glb';


// Load earth first
loadModel(earth, { x: 3, y: 0, z: 300 }, 50).then(model => {
    earthModel = model;
});

// Load mercury and set up orbit
loadModel(mercury, { x: 3 + orbitRadius, y: 0, z: 300 }, 3).then(model => {
    mercuryModel = model;
});


// Load mer2 with custom texture
const textureLoader = new THREE.TextureLoader();
const customTexture = textureLoader.load('./photos/1.png');
customTexture.encoding = THREE.sRGBEncoding;

const gltfLoader = new GLTFLoader();
gltfLoader.load('./models/mer2.glb', (gltf) => {
    const model = gltf.scene;
    
    // Set initial position for orbit
    model.position.set(3 + orbitRadius2, 0, 300);
    model.scale.set(5, 5, 5); // Increased scale for larger planet
    
    // Traverse the model to find mesh(es) and replace materials
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ 
                map: customTexture,
                roughness: 0.5,
                metalness: 0.1,
                color: new THREE.Color(1.5, 1.5, 1.5) // Increase saturation
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    mer2Model = model;
    scene.add(model);
    console.log('mer2.glb loaded successfully');

});

// Load mer3 with custom texture (2.png)
const textureLoader3 = new THREE.TextureLoader();
const customTexture3 = textureLoader3.load('./photos/2.png');
customTexture3.encoding = THREE.sRGBEncoding;

gltfLoader.load('./models/mer2.glb', (gltf) => {
    const model = gltf.scene;
    
    // Set initial position for orbit
    model.position.set(3 + orbitRadius3, 0, 300);
    model.scale.set(10, 10, 10);
    
    // Traverse the model to find mesh(es) and replace materials
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ 
                map: customTexture3,
                roughness: 0.5,
                metalness: 0.1,
                color: new THREE.Color(1.5, 1.5, 1.5) // Increase saturation
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    mer3Model = model;
    scene.add(model);
    console.log('mer3.glb loaded successfully');
}, undefined, (error) => {
    console.error('GLTF load error:', error);
});

// Load mer4 with custom texture (3.png)
const textureLoader4 = new THREE.TextureLoader();
const customTexture4 = textureLoader4.load('./photos/3.png');
customTexture4.encoding = THREE.sRGBEncoding;

gltfLoader.load('./models/mer2.glb', (gltf) => {
    const model = gltf.scene;
    
    // Set initial position for orbit
    model.position.set(3 + orbitRadius4, 0, 300);
    model.scale.set(6, 6, 6);
    
    // Traverse the model to find mesh(es) and replace materials
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ 
                map: customTexture4,
                roughness: 0.5,
                metalness: 0.1,
                color: new THREE.Color(1.5, 1.5, 1.5) // Increase saturation
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    mer4Model = model;
    scene.add(model);
    console.log('mer4.glb loaded successfully');
}, undefined, (error) => {
    console.error('GLTF load error:', error);
});

// Load mer5 with custom texture (4.png)
const textureLoader5 = new THREE.TextureLoader();
const customTexture5 = textureLoader5.load('./photos/4.png');
customTexture5.encoding = THREE.sRGBEncoding;

gltfLoader.load('./models/mer2.glb', (gltf) => {
    const model = gltf.scene;
    
    // Set initial position for orbit
    model.position.set(3 + orbitRadius5, 0, 300);
    model.scale.set(10, 10, 10);
    
    // Traverse the model to find mesh(es) and replace materials
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ 
                map: customTexture5,
                roughness: 0.5,
                metalness: 0.1,
                color: new THREE.Color(1.5, 1.5, 1.5) // Increase saturation
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    mer5Model = model;
    scene.add(model);
    console.log('mer5.glb loaded successfully');
}, undefined, (error) => {
    console.error('GLTF load error:', error);
});

// Load mer6 with custom texture (5.png)
const textureLoader6 = new THREE.TextureLoader();
const customTexture6 = textureLoader6.load('./photos/5.png');
customTexture6.encoding = THREE.sRGBEncoding;

gltfLoader.load('./models/mer2.glb', (gltf) => {
    const model = gltf.scene;
    
    // Set initial position for orbit
    model.position.set(3 + orbitRadius6, 0, 300);
    model.scale.set(8, 8, 8);
    
    // Traverse the model to find mesh(es) and replace materials
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ 
                map: customTexture6,
                roughness: 0.5,
                metalness: 0.1,
                color: new THREE.Color(1.5, 1.5, 1.5) // Increase saturation
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    mer6Model = model;
    scene.add(model);
    console.log('mer6.glb loaded successfully');
}, undefined, (error) => {
    console.error('GLTF load error:', error);
});



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
    
    // Orbital animation for mercury around earth
    if (mercuryModel && earthModel) {
        orbitAngle += orbitSpeed;
        
        // Calculate new position for mercury
        const earthX = earthModel.position.x;
        const earthZ = earthModel.position.z;
        
        mercuryModel.position.x = earthX + orbitRadius * Math.cos(orbitAngle);
        mercuryModel.position.z = earthZ + orbitRadius * Math.sin(orbitAngle);
        
        // Optional: Add some vertical variation for more realistic orbit
        mercuryModel.position.y = earthModel.position.y + 10 * Math.sin(orbitAngle * 2);
    }
    
    // Orbital animation for mer2 around earth
    if (mer2Model && earthModel) {
        orbitAngle2 += orbitSpeed2;
        
        // Calculate new position for mer2
        const earthX = earthModel.position.x;
        const earthZ = earthModel.position.z;
        
        mer2Model.position.x = earthX + orbitRadius2 * Math.cos(orbitAngle2);
        mer2Model.position.z = earthZ + orbitRadius2 * Math.sin(orbitAngle2);
        
        // Optional: Add some vertical variation for more realistic orbit
        mer2Model.position.y = earthModel.position.y + 15 * Math.sin(orbitAngle2 * 1.5);
    }
    
    // Orbital animation for mer3 around earth
    if (mer3Model && earthModel) {
        orbitAngle3 += orbitSpeed3;
        
        const earthX = earthModel.position.x;
        const earthZ = earthModel.position.z;
        
        mer3Model.position.x = earthX + orbitRadius3 * Math.cos(orbitAngle3);
        mer3Model.position.z = earthZ + orbitRadius3 * Math.sin(orbitAngle3);
        mer3Model.position.y = earthModel.position.y + 12 * Math.sin(orbitAngle3 * 1.8);
    }
    
    // Orbital animation for mer4 around earth
    if (mer4Model && earthModel) {
        orbitAngle4 += orbitSpeed4;
        
        const earthX = earthModel.position.x;
        const earthZ = earthModel.position.z;
        
        mer4Model.position.x = earthX + orbitRadius4 * Math.cos(orbitAngle4);
        mer4Model.position.z = earthZ + orbitRadius4 * Math.sin(orbitAngle4);
        mer4Model.position.y = earthModel.position.y + 18 * Math.sin(orbitAngle4 * 1.2);
    }
    
    // Orbital animation for mer5 around earth
    if (mer5Model && earthModel) {
        orbitAngle5 += orbitSpeed5;
        
        const earthX = earthModel.position.x;
        const earthZ = earthModel.position.z;
        
        mer5Model.position.x = earthX + orbitRadius5 * Math.cos(orbitAngle5);
        mer5Model.position.z = earthZ + orbitRadius5 * Math.sin(orbitAngle5);
        mer5Model.position.y = earthModel.position.y + 14 * Math.sin(orbitAngle5 * 1.6);
    }
    
    // Orbital animation for mer6 around earth
    if (mer6Model && earthModel) {
        orbitAngle6 += orbitSpeed6;
        
        const earthX = earthModel.position.x;
        const earthZ = earthModel.position.z;
        
        mer6Model.position.x = earthX + orbitRadius6 * Math.cos(orbitAngle6);
        mer6Model.position.z = earthZ + orbitRadius6 * Math.sin(orbitAngle6);
        mer6Model.position.y = earthModel.position.y + 16 * Math.sin(orbitAngle6 * 1.4);
    }
    
    // Show/hide text box based on camera position near planets
    const textBox = document.querySelector('.bottom-right-text');
    if (textBox) {
        const distanceToPlanets = Math.sqrt(
            Math.pow(camera.position.x - 3, 2) + 
            Math.pow(camera.position.z - 300, 2)
        );
        
        // Show text when camera is within 200 units of the planets
        if (distanceToPlanets < 200) {
            textBox.style.opacity = '1';
            textBox.style.visibility = 'visible';
        } else {
            textBox.style.opacity = '0';
            textBox.style.visibility = 'hidden';
        }
    }
    
    renderer.setClearColor(0xffffff, 1); // Dark grey background color
    renderer.render(scene, camera);
    controls.update();
}


animate();

