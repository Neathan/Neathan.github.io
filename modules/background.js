import * as THREE from 'https://cdn.skypack.dev/three'

let camera, scene, renderer;
let geometry, material, mesh;

const gridSize = 0.1;

let cubes = [];

init();

function updateSize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( gridSize, gridSize, gridSize );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );

    const width = 16;
    const height = 9;

    for(let x = -width; x < width; ++x) {
        for(let y = -width; y < height; ++y) {
            let cube = new THREE.Mesh( geometry, material );
            let z = Math.random();
            cube.position.set(x*gridSize, y*gridSize, );
            cubes.push( { obj: cube, z: z } );
            scene.add( cube );
        }
    }

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );

    window.addEventListener('resize', updateSize);

}

function animation( time ) {

    cubes.forEach(cube => {
        cube.obj.position.z = (cube.z + Math.sin(cube.z * time / 1000.0)) * gridSize / 5.0;
    });

    renderer.render( scene, camera );

}