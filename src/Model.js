import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const legs = [
    {
        name: 'Armature_0',
        index: 0,
        textureURL: 'textures/cat_legs_texture.png',
    },
    {
        name: 'Armature_1',
        index: 1,
        textureURL: 'textures/fairy_wings_texture.png',
        meshNames: ['Mesh001_4','Mesh001_3', 'Mesh001_5']
    },
    {
        name: 'Armature_2',
        index: 2,
        textureURL: 'textures/hoverbike_texture.png',
        meshNames: ['Mesh002']
        
    },
    {
        name: 'Armature_3',
        index: 3,
        textureURL: 'textures/popcorn_box_texture.png ',
        meshNames: ['Mesh003_2']
    },
    {
        name: 'Armature_4',
        index: 4,
        textureURL: 'textures/rideable_pig_regular_texture.png ',
        meshNames: ['Mesh004_1']
    },
    {
        name: 'Armature_5',
        index: 5,
        textureURL: 'textures/tall_boots_texture.png ',
        meshNames: ['Mesh005_1, Mesh005_2']
    }
]

export class Model {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.textureLoader = new THREE.TextureLoader();

        this.legsCollectionModel,
            this.bodyCollectionModel,
            this.weaponCollectionModel;

        this.weapon = '';
        this.legs = '';
        this.body = '';

        // this.
    }

    loadBody() {

        this.loader.load('/models/bodies.glb', (gltf) => {
            const model = gltf.scene;

            // this.scene.add(model);
            console.log('Model loaded');
            console.log(gltf);

            const arma_1 = model.children[3];

            // console.log(model.children[0].name);

            arma_1.scale.set(0.02, 0.02, 0.02);
            arma_1.position.set(0, -1, 0);
            // this.scene.add(arma_1);

            const childs = [];

            model.traverse(function (child, index) {
                if (child.isMesh) {
                    child.visible = true;
                    child.position.set(0, 0, 0);
                    childs.push(child);
                }
            });

            childs.forEach((child, i) => {
                child.position.set(i * 0.1, 0, 0);
                // console.log(child.name);
                // this.scene.add(child);
            });
        });
    }

    loadLegs() {
        this.loader.load('/models/legs.glb', (gltf) => {
            const model = gltf.scene;

            const index = 0;

            const arma_1 = model.children[2];

            const url = legs[index].textureURL;
            // console.log(url)

            arma_1.children

            arma_1.traverse((child) => {
                if (child.isMesh) {
                    console.log(child);

                    if (child.name === 'Mesh002') {

                        child.material.color = new THREE.Color(0xff6347);
                    }
                }

            })
            // console.log(this.textureLoader)

            // this.textureLoader.load(url, (texture) => {
            //     console.log(texture)
            //     console.log(arma_1)
            //     arma_1.children[0].children[0].material.map = texture;
            //     arma_1.children[0].children[0].material.needsUpdate = true;
            // }, undefined, (error) => {
            //     console.error('Ошибка загрузки текстуры:', error);
            // })

            // console.log(model);

            // model.scale.set(10, 10, 10);

            arma_1.scale.set(10, 10, 10);
            // arma_1.position.set(0, 0, 0);
            this.scene.add(arma_1);
        });

    }

    rollLegs(side = '') {
        if (side === 'left') {
            legs.forEach((leg, i) => {
                const name = leg.name;

                // const 

            })
        }


        if (side === 'right') {

        }
    }

    setLegs() {
        legs.forEach((leg, i) => {
            const name = leg.name;

            const legCollection = this.legs.children.filter(child => child.name === name);

            const legs = [];
            this.legsCollectionModel.children.forEach(child => legs.push(child));

            legs.forEach((leg, i) => { legs.visible = false; });
            legs.filter((leg, i) => i === this.legs)


        })
    }
}