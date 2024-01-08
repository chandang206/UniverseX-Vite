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

// torus geometry //
const TorusTexture = new THREE.TextureLoader().load('../media/lava.jpeg');

const Torus = new THREE.Mesh( 
    new THREE.TorusGeometry( 12, 4, 16, 100 ),
    new THREE.MeshBasicMaterial( { map: TorusTexture } )
);

scene.add(Torus);

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
const spaceTexture = new THREE.TextureLoader().load('../media/space.jpeg');
scene.background = spaceTexture;

// octahedron geometry //
const OctahedronTexture = new THREE.TextureLoader().load('../media/blue.jpeg');
const Octahedron = new THREE.Mesh(
    new THREE.OctahedronGeometry(5,0),
    new THREE.MeshBasicMaterial( { map: OctahedronTexture } )
);
scene.add(Octahedron);

// mars //
const marsTexture = new THREE.TextureLoader().load('../media/maroon.jpeg');
const normalTexture = new THREE.TextureLoader().load('../media/normal.jpeg');

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ 
        map : marsTexture, 
        normalMap: normalTexture
    })
);
scene.add(mars);

mars.position.z = 30;
mars.position.setX(-10);

// octahedron geometry // 
const octahedronTexture = new THREE.TextureLoader().load('../media/mars.jpeg');

const octahedron = new THREE.Mesh(
    new THREE.OctahedronGeometry(5, 0),
    new THREE.MeshStandardMaterial( { map: octahedronTexture } )
);

scene.add(octahedron);

octahedron.position.z = 40;
octahedron.position.setX(12);

// animation on scroll //
function moveCamera () {
    const t = document.body.getBoundingClientRect().top;
    
    // rotate on scroll //
    mars.rotation.x += 0.05;
    mars.rotation.y += 0.075;
    mars.rotation.z += 0.05;

    Octahedron.rotation.y += 0.02;
    Octahedron.rotation.z += 0.02;

    octahedron.rotation.y += 0.02;
    octahedron.rotation.z += 0.02;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

// rotate torus infinitely //
function animate() {
    requestAnimationFrame( animate );

    Torus.rotation.x += 0.01;
    Torus.rotation.y += 0.005;
    Torus.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera );
}

animate();

