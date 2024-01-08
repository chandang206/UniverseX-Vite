import './style_main.css';

import * as THREE from 'three';

import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// create a sence // 
const scene = new THREE.Scene();

// create a object //
const geometry = new THREE.DodecahedronGeometry(4, 0);
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
    roughness: 0.2,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// scale //
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// light // 
const light = new THREE.PointLight(0xffffff, 150, 100);
light.position.set(0, 10, 10);
scene.add(light);

// camera // 
const camera = new THREE.PerspectiveCamera(
    45, 
    sizes.width / sizes.height, 
    0.1, 
    100
);
camera.position.z = 20;
scene.add(camera);

// background //
const darkB = new THREE.TextureLoader().load('./media/dark.jpeg');
scene.background = darkB;


// renderer //
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// controls //
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


// Resize //
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update and render the camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
});

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
};
loop();

// animation upon refresh //
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo('nav', { y: '-100%' }, { y: '0%' });
tl.fromTo('.title', { opacity: 0 }, { opacity: 1 });

// pointer color animation //
let mouseDown = false;
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));

// change the color accordingly to the mouse movement //
window.addEventListener('mousemove', (e) => {
    if(mouseDown) {
         const rgb = {
            r: e.pageX / sizes.width,
            g: e.pageY / sizes.height,
            b: 0.6,
         }
        gsap.to(mesh.material.color, rgb);
    }
});
