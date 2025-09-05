import * as THREE from 'three';

const url = ['./backgrounds/bakcground_0.jpg', './backgrounds/bakcground_1.jpg', './backgrounds/bakcground_2.jpg', './backgrounds/bakcground_3.jpg', './backgrounds/bakcground_4.jpg', './backgrounds/bakcground_5.jpg'];

export class Environment {
    constructor(scene) {
        this.scene = scene;
    }

    async loadBackground() {
        const loader = new THREE.TextureLoader();
        loader.load('backgrounds/background_0.jpg', (texture) => {
            this.scene.background = texture;
        });
    }
}