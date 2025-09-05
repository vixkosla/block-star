import * as THREE from 'three';

export default class App {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
    }

    init() {
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 5;
        this.renderer.backgroundColor = 0xA2FF10;
    }

    start() {
        this.render();
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}