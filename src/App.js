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

        this.clock = new THREE.Clock();

    }

    init() {
        this.canvas = this.renderer.domElement;
        this.container.appendChild(this.canvas);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.camera.position.z = 4;
        // this.camera.position.x = 0;
        // this.camera.position.y = -10;

        this.env = new Environment(this.scene, this.renderer);
        this.model = new Model(this.scene);

        this.renderer.toneMapping = THREE.NoToneMapping; // или THREE.ReinhardToneMapping
        this.renderer.toneMappingExposure = 1.5; // Значение экспозиции (по умолчанию 1.0)

        this.resize();

        this.initControls();
    }

    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.035; // чем меньше, тем более "тягучее" движение
        this.controls.minDistance = 7;  // минимальное приближение
        this.controls.maxDistance = 7; // максимальное отдаление
        this.controls.minPolarAngle = Math.PI / 2;  // не ниже 45°
        this.controls.maxPolarAngle = Math.PI / 2;  // не выше 90°
        this.controls.minAzimuthAngle = -Math.PI / 3; // влево максимум -45°
        this.controls.maxAzimuthAngle = Math.PI / 3; // вправо максимум 45°
        this.controls.update();
    }

    async start() {
        this.render();

        this.env.loadBackground();
        this.env.initLight();

        await this.model.loadModels();
        this.mixer_body = this.model.mixer_body;
        this.mixer_legs = this.model.mixer_legs;


        // model.loadWeapon();
        this.events();
        this.env.loadTextures();

    }

    events() {
        // левое меню
        document.querySelector('roll-button[data-part="body"]').rollCollection = (side, type) => this.model.rollParts(side, type);
        document.querySelector('roll-button[data-part="legs"]').rollCollection = (side, type) => this.model.rollParts(side, type);
        // document.querySelector('roll-button[data-part="weapon"]').rollCollection = (side, type) => this.model.rollParts(side, type);
        document.querySelector('roll-button[data-part="background"]').rollCollection = (side, type) => this.env.rollBackground(side, type);

        // правое меню
        document.querySelector('color-picker').changeColor = (color) => this.model.setColor(color);

        document.querySelector('.ui-container').addEventListener("dblclick", (e) => {
            e.preventDefault(); // Отменяем двойной клик
        });
    }

    render() {
        const delta = this.clock.getDelta();

        requestAnimationFrame(this.render.bind(this));

        if (this.mixer_legs) this.mixer_legs.update(delta);
        if (this.mixer_body) this.mixer_body.update(delta);

        this.controls.update(); // нужно при enableDamping
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