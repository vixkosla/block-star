import * as THREE from 'three';

const url = ['./backgrounds/background_0.jpg', './backgrounds/background_1.jpg', './backgrounds/background_2.jpg', './backgrounds/background_3.jpg', './backgrounds/background_4.jpg', './backgrounds/background_5.jpg'];

export class Environment {
    constructor(scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;
        this.loader = new THREE.TextureLoader();

        this.textures = []
        this.index = 0;
    }

    loadBackground() {
        this.loader.load('backgrounds/background_0.jpg', (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            this.scene.background = texture;
            this.textures.push(texture);
        });
    }

    setBackground() {
        this.scene.background = this.textures[this.index];
    }

    rollBackground(side = '', type = '') {
        const count = this.textures.length;
        const delta = side === 'left' ? -1 : side === 'right'? 1 : 0;

        this.index = ((this.index + delta) % count + count) % count;

        this.setBackground();
    }

    loadTextures() {
        url.forEach((path) => {
            this.loader.load(path, (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.magFilter = THREE.LinearFilter;
                texture.minFilter = THREE.LinearMipmapLinearFilter;
                this.textures.push(texture);
            })        
        })
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