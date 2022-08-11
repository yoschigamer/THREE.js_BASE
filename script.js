import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement)


const loader = new FBXLoader();
loader.load('./donut.fbx', function (object) {

    object.castShadow = false;
    object.receiveShadow = false;
    object.scale.set(0.1, 0.1, 0.1);
    scene.add(object);
});

scene.background = new THREE.Color(0xffffff);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


camera.position.z = 10;

var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0.6);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);



scene.add(hemiLight, directionalLight);

var animate = function () {

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
