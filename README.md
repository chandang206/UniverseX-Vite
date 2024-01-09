
![Logo](https://c.wallhere.com/photos/ce/7b/2000x1333_px_astronaut_black_holes_Earth_lens_flare_space-677343.jpg!d)


## Demo

Page demo: https://chandang206.github.io/UniverseX-Vite/

# 🪐 UniverseX

A simple website with an **interactive home page** and **two immersive pages** explaining about the origin and concept of space and cosmos.

*Languages:* 
- **JavaScript** (main) 
- **HTML** 
- **CSS**

Files in the project includes:

   - _main.js_
   - _script_space.js_
   - _scrip_cosmos.js_
   - _index.html_
   - _space.html_
   - _comos.html_
   - _style_main.css_
   - _style_script.css_
   - _README.md_

   and some other configuring files and forlders.
## 🛠 Tech

**Vite:** to to provide a quick local web server as well as faster and leaner development experience for modern web projects.

**ThreeJS:** to create the 3D environment with stunning geometries and lights to shape the immersive experience.
## ⚙️ Installation

First we need to set up a local server

Install Vite with npm (in the terminal):

```bash
npm create vite@latest
```

![Screenshot](https://www.section.io/engineering-education/creating-a-react-app-using-vite/framework.PNG)

 There some options about how you want to set up the project. I choose **vanilla** and **JavaScript**.

 Next we need to install ThreeJS.
 
Type `npm install three` or `npm install three gsap`

Finally, run this command to host a local server:
```bash
npm run dev
```
For more information, visit: https://vitejs.dev/guide/
## 🚀 Deployment

After run the command, there will be a local server to click:

![Screenshot](https://static.platzi.com/media/articlases/Images/vite-run-dev.png )

Depends on the device, the address will be differentiated.


![Screenshot](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazd5MXR3a2RoZ3ZqYjQxdDNkY2p1MmtjYXVscHJrM25qZmVsa2JqcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3jqzrGZ2uynRwoycpU/giphy-downsized-large.gif)

Welcome to the front page! Give the object a spin!

Now let's go into other pages and explore:

![Screenshot](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzl0aWxkcGxrczBmMWppejRuNXhyd3Z3bnNyb2JzdWUyYXlleDg1cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3anlK1Ht4k7xWcqi2p/giphy-downsized-large.gif)

We have **Space**

![Screemshot](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXJvZDBzejN2ZDdveHdyYzducWN0c2tsbmkxYzVycWs2cHJta3NkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/twMRGbho9jxHwB8wVM/giphy-downsized-large.gif)

and of course, **Cosmos**.

The content is mostly used by some articles (referenced below). The main focus is the functions and applications that can make the web more interactive and immersive.



## 🛞 Functions
There are many functions but some focuses are:

- **Change color upon dragging pointer(main page)**:

```javascript
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
```
I found out that we can pass the color directly if the values are between 0 and 1 which is what THREE.Color does it converts the rgb values to a value between 0 and 1. Hence, make the cube not only can be turned around, but also change color.

- **Adding random stars (other pages)**:
```javascript
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
```

Although I added the background image, the scene seemed to be not quite immersive. Therefore, I tried to create random small "objects" (stars) around the scene and make them "move" on scroll to feell more immersion and viewers are "moving". The **randFloatSpread()** function is the key here.

- **Animation on scroll (other pages)**:
```javascript
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
```
Same with *Adding Stars*, the key here is the position of the camera. Since we use *getBoundingClientRect().top* function, the top values will always be negative. The multiply numbers are mutable depends on user experience to make the movement on scroll more immersive.

- **Other mentions**:
```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


function animate() {
    requestAnimationFrame( animate );

    TorusKnot.rotation.x += 0.01;
    TorusKnot.rotation.y += 0.001;
    TorusKnot.rotation.z += 0.01;

    controls.update();

    renderer.render( scene, camera );
}

animate();
```

Simply put, this make the scene more interactive and can also move around the scene with our mouse (but we used the loop function to rotate the "main" object in this case). Thats why we also need to *update* the *controls* in the function.

## Authors

- [Chan, Dang Tran Bao](https://github.com/chandang206)


## Acknowledgements

 - [Space Content](https://www.space.com/24870-what-is-space.html#section-black-holes)
 - [Cosmos Content](https://www.britannica.com/science/cosmology-astronomy/The-Einstein-de-Sitter-universe#ref27601)


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://baochandang.wixsite.com/profile)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chan-dang-tran-bao-31127367/)

