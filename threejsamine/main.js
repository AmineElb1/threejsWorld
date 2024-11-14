import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



// Scene, Camera & Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Lichtblauw voor de lucht

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;





// House Structure
const houseGeometry = new THREE.BoxGeometry(4, 4, 4);
const houseMaterial = new THREE.MeshStandardMaterial({ color: 0x8a2be2 });
const house = new THREE.Mesh(houseGeometry, houseMaterial);
house.position.y = 2; // Verhoog het huis een beetje zodat het op de grond staat
scene.add(house);

// Roof
const roofGeometry = new THREE.ConeGeometry(3.5, 2, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 5;
roof.rotation.y = Math.PI / 4;
scene.add(roof);

// Ground/Grass
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Donkergroen voor gras
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Kantel het vlak horizontaal
ground.position.y = 0; // Plaats het grondvlak op hoogte 0
scene.add(ground);

// Name Card
const nameTexture = new THREE.TextureLoader().load('../images/Amine.png');
const cardGeometry = new THREE.PlaneGeometry(2, 1);
const cardMaterial = new THREE.MeshBasicMaterial({ map: nameTexture });
const nameCard = new THREE.Mesh(cardGeometry, cardMaterial);
nameCard.position.set(0, 0, 2.05);
house.add(nameCard);

// Trees (Loop)
const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 4, 8);
const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Bruin voor stam
const leavesGeometry = new THREE.SphereGeometry(1.5, 8, 8);
const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x32CD32 }); // Groen voor bladeren

for (let i = 0; i < 5; i++) {
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set((Math.random() - 0.5) * 20, 2, (Math.random() - 0.5) * 20);
    
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(0, 3.5, 0); // Plaats bladeren bovenop de stam
    trunk.add(leaves); // Voeg bladeren toe aan de stam
    
    scene.add(trunk);
}

// Clouds (Loop)
const cloudGeometry = new THREE.SphereGeometry(1, 12, 12);
const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f8ff });
for (let i = 0; i < 5; i++) {
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.position.set((Math.random() - 0.5) * 2, 10, (Math.random() - 0.5) * 2);
    scene.add(cloud);
}

const cloudGeometry2 = new THREE.SphereGeometry(1, 12, 12);
const cloudMaterial2 = new THREE.MeshStandardMaterial({ color: 0xf0f8ff });
for (let i = 0; i < 5; i++) {
    const cloud = new THREE.Mesh(cloudGeometry2, cloudMaterial2);
    cloud.position.set((Math.random() - 0.05) * 2, 10, (Math.random() - 0.05) * 2);
    scene.add(cloud);
}


// Light Source
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// Animation
function animate() {
    requestAnimationFrame(animate);
    house.rotation.y += 0.01; // Rotate house
    roof.rotation.y += 0.01; // Rotate roof
    renderer.render(scene, camera);
}

animate();

// Responsive Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
