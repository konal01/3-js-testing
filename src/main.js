import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x001f3f }),
    new THREE.MeshBasicMaterial({ color: 0x0074d9 }), 
    new THREE.MeshBasicMaterial({ color: 0x7fdbff }), 
    new THREE.MeshBasicMaterial({ color: 0x39cccc }), 
    new THREE.MeshBasicMaterial({ color: 0x3d9970 }), 
    new THREE.MeshBasicMaterial({ color: 0x2ecc40 }), 
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);


const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});


function animate() {
    requestAnimationFrame(animate);


    cube.rotation.x += (mouse.y * Math.PI - cube.rotation.x) * 0.1;
    cube.rotation.y += (mouse.x * Math.PI - cube.rotation.y) * 0.1;

    renderer.render(scene, camera);
}
animate();


const trailer = document.getElementById('trailer');
window.onmousemove = (event) => {
    const x = event.clientX - trailer.offsetWidth / 2;
    const y = event.clientY - trailer.offsetHeight / 2;

    trailer.style.transform = `translate(${x}px, ${y}px)`;
};


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
