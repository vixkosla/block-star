import * as THREE from 'three';

const url = ['./backgrounds/bakcground_0.jpg', './backgrounds/bakcground_1.jpg', './backgrounds/bakcground_2.jpg', './backgrounds/bakcground_3.jpg', './backgrounds/bakcground_4.jpg', './backgrounds/bakcground_5.jpg'];

export class Environment {
    constructor(scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;
    }

    async loadBackground() {
        const loader = new THREE.TextureLoader();
        loader.load('backgrounds/background_0.jpg', (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            this.scene.background = texture;
        });
    }

    setBackground() {

    }

    initLight() {
        const light = new THREE.PointLight(0xffffff);
        light.position.set(2, 2, 2);
        this.scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        this.scene.add(ambientLight);
    }
}