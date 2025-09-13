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
        meshNames: ['Mesh001_4', 'Mesh001_3', 'Mesh001_5']
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

        this.weaponIndex = 2;
        this.legsIndex = 4;
        this.bodyIndex = 3;

        // this.
    }

    initScene() {
        if (!this.bodyCollectionModel || !this.legsCollectionModel) {
            console.warn('initScene called before models finished loading');
            return;
        }

        console.log("model:", this.bodyCollectionModel)
        this.cleanModel(this.bodyCollectionModel);
        this.cleanModel(this.legsCollectionModel);
        // this.cleanModel(this.weaponCollectionModel);

        this.setModelPart(this.bodyCollectionModel, this.bodyIndex)
        this.setModelPart(this.legsCollectionModel, this.legsIndex)


        // this.setLegs();
        // this.setBody();
        // this.setWeapon();


    }

    cleanModel(model) {
        if (!model || !model.children) return;
        console.log(model.children)
        const parts = model.children
        parts.forEach((child) => {
            // выключаем видимость всей ветки
            child.traverse((node) => { node.visible = false; });
        });
    }

    setModelPart(model, index) {
        if (!model || !model.children) return;
        const parts = model.children;
        const part = parts[index];
        console.log('part:', part);
        if (!part) return;
        // включаем видимость всей ветки
        part.traverse((node) => { node.visible = true; });
    }

    async loadBody() {

        const gltf = await this.loader.loadAsync('/models/bodies.glb')
        const model = gltf.scene;

        const parts = model.children
        parts.forEach((child, i) => {
            child.visible = false;
            child.scale.set(0.02, 0.02, 0.02);
        });

        this.scene.add(model)
        this.bodyCollectionModel = model;

        return model;
    }

    async loadLegs() {
        const gltf = await this.loader.loadAsync('/models/legs.glb');
        const model = gltf.scene;

        const parts = model.children
        parts.forEach((child, i) => {
            console.log(child.name, child)
            child.visible = false;
            child.scale.set(0.2, 0.2, 0.2);
            child.position.y = -3;
            child.rotation.z = Math.PI;
        });

        this.scene.add(model);

        this.legsCollectionModel = model;

        return model;
    }

    async loadModels() {
        await Promise.all([this.loadBody(), this.loadLegs()]);
        this.initScene();
    }

    rollParts(side = '', type = '') {
        const collection = this[`${type}CollectionModel`];
        let index = this[`${type}Index`];

        const count = collection.children.length;
        const delta = side === 'left' ? -1 : side === 'right' ? 1 : 0;
        index = ((index + delta) % count + count) % count; // безопасное модуло

        this[`${type}Index`] = index;
        this.cleanModel(collection);
        this.setModelPart(collection, index);
    }

    changeColor(color) {
        console.log('changeColor:', color);
    }
}