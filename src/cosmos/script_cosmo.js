import '../style_script.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

// TorusKnot geometry //
const TorusKnotTexture = new THREE.TextureLoader().load('../media/comic.jpeg');

const TorusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(10, 2, 160, 10, 1, 4),
    new THREE.MeshStandardMaterial( {map : TorusKnotTexture} )
);

scene.add(TorusKnot);

// light //
const pointLight = new THREE.PointLight(0xffffff, 180, 100);
pointLight.position.set(0, 10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 5);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// random stars //
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material);

  // make the stars random //
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
  
  star.position.set(x, y, z);
  scene.add(star);
};

Array(200).fill().forEach(addStar);

// background image //
const spaceTexture = new THREE.TextureLoader().load('../media/dark.png');
scene.background = spaceTexture;

// icosahedron geometry //
const icosahedronTexture = new THREE.TextureLoader().load('../media/contrast.jpeg');
const icosahedron = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3, 2),
    new THREE.MeshBasicMaterial( { map: icosahedronTexture } )
);
scene.add(icosahedron);

// sun //
const sunTexture = new THREE.TextureLoader().load('../media/sun.jpeg');
const normalTexture = new THREE.TextureLoader().load('../media/normal.jpeg');

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ 
        map : sunTexture, 
        normalMap: normalTexture
    })
);
scene.add(sun);

sun.position.z = 30;
sun.position.setX(-10);

// cone geometry // 
const coneTexture = new THREE.TextureLoader().load('../media/colorado.jpeg');

const cone = new THREE.Mesh(
    new THREE.ConeGeometry(4, 8, 6, 1),
    new THREE.MeshStandardMaterial( { map: coneTexture } )
);

scene.add(cone);

cone.position.z = 40;
cone.position.setX(12);

// animation on scroll //
function moveCamera () {
    const t = document.body.getBoundingClientRect().top;
    
    // rotate on scroll //
    sun.rotation.x += 0.05;
    sun.rotation.y += 0.075;
    sun.rotation.z += 0.05;

    icosahedron.rotation.y += 0.02;
    icosahedron.rotation.z += 0.02;

    cone.rotation.y += 0.02;
    cone.rotation.z += 0.02;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

// rotate icosahedron infinitely //
function animate() {
    requestAnimationFrame( animate );

    TorusKnot.rotation.x += 0.01;
    TorusKnot.rotation.y += 0.001;
    TorusKnot.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera );
}

animate();

