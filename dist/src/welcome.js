import { db, setDoc, getDoc, doc, auth } from '../firebaseConfig.js';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

document.addEventListener('DOMContentLoaded', function() {
    const about = document.getElementById("about-button");
    const inita = document.getElementById("init-button");
    const newsletter = document.getElementById("news-button");

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
    const canvas = document.getElementById("threejs-canvas");
    
    let camera, scene, renderer;

    init();

    function init( ) {

        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set( 0, 0, 600 );

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xfae1fa );

        const loader = new FontLoader();
        loader.load( '../../node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

            const color = new THREE.Color( 0xad016b );

            const matDark = new THREE.MeshBasicMaterial( {
                color: color,
                side: THREE.DoubleSide
            } );

            const matLite = new THREE.MeshBasicMaterial( {
                color: color,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            } );

            const message = 'Welcome To\nEndless Possibilities.';

            const shapes = font.generateShapes( message, 60 );

            const geometry = new THREE.ShapeGeometry( shapes );

            geometry.computeBoundingBox();

            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

            geometry.translate( xMid, 0, 0 );

            // make shape ( N.B. edge view not visible )

            const text = new THREE.Mesh( geometry, matLite );
            text.position.z = - 150;
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

            const style = SVGLoader.getStrokeStyle( 3, color.getStyle() );

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

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( 0, 0, 0 );
        controls.update();

        controls.addEventListener( 'change', render );

        window.addEventListener( 'resize', onWindowResize );

    } // end init

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

    }

    function render() {

        renderer.render( scene, camera );

    }
            
    const profilePic = document.getElementById('profile-icon');

    async function updateProfilePic() {
        const user = auth.currentUser;
        if(user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef); //checking if the user doc exists

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                const avatarId = userData.avatar_id; // Get the avatar ID from the user data
                profilePic.src = `/public/images/avatars/${avatarId}.png`; // Set the profile picture source
            }
        }
    }

    updateProfilePic();

});