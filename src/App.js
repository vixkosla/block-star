import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Environment } from './Environment.js';
import { Model } from './Model.js';

export default class App {
    constructor(container) {
        this.container = container;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
    }

    init() {
        this.canvas = this.renderer.domElement;
        this.container.appendChild(this.canvas);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 5;

        this.env = new Environment(this.scene, this.renderer);
        this.model = new Model(this.scene);

        this.resize();
        this.controls();
    }

    controls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.update();
    }

    start() {
        this.render();

        this.env.loadBackground();
        this.env.initLight();

        this.model.loadBody();
        this.model.loadLegs();
        // model.loadWeapon();
        this.events();



    }

    events() {
        // левое меню
        document.getElementsByTagName('roll-button[data-part="body"]').rollCollection = () => this.model.setWeapon();
        document.getElementsByTagName('roll-button[data-part="body"]').rollCollection = () => this.model.setBody();
        document.getElementsByTagName('roll-button[data-part="body"]').rollCollection = () => this.model.setLegs();
        document.getElementsByTagName('roll-button[data-part="body"]').rollCollection = () => this.env.setBackground();
        // правое меню

        document.querySelector('.ui-container').addEventListener("dblclick", (e) => {
            e.preventDefault(); // Отменяем двойной клик
        });
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);

    }

    resize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        })
    }


}