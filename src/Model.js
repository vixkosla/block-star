import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const legsData = [
    {
        name: 'Armature_0',
        index: 0,
        textureURL: 'textures/cat_legs_texture.png',
        bone: 'main',
        targetColorMesh: ['Mesh001_3', 'Mesh001_5', 'Mesh001_4']
    },
    {
        name: 'Armature_1',
        index: 1,
        textureURL: 'textures/fairy_wings_texture.png',
        meshNames: ['Mesh001_4', 'Mesh001_3', 'Mesh001_5'],
        bone: 'bn_body_2',
        targetColorMesh: ['Mesh004_2']
    },
    {
        name: 'Armature_2',
        index: 2,
        textureURL: 'textures/hoverbike_texture.png',
        meshNames: ['Mesh002'],
        bone: 'bn_body',
        bodyPosition: new THREE.Vector3(0, 1.5, 0),
        targetColorMesh: ['Mesh002']
    },
    {
        name: 'Armature_3',
        index: 3,
        textureURL: 'textures/popcorn_box_texture.png ',
        meshNames: ['Mesh003_2'],
        bone: 'root_1',
        targetColorMesh: ['Mesh005']
    },
    {
        name: 'Armature_4',
        index: 4,
        textureURL: 'textures/rideable_pig_regular_texture.png ',
        meshNames: ['Mesh004_1'],
        bone: 'bn_body_1',
        targetColorMesh: ['Mesh003_2', 'Mesh003_1']
    },
    {
        name: 'Armature_5',
        index: 5,
        textureURL: 'textures/tall_boots_texture.png ',
        meshNames: ['Mesh005_1, Mesh005_2'],
        bone: 'root',
        targetColorMesh: ['Mesh']
    }
]

const bodyData = [
    {
        name: 'Armature_0',
        index: 0,
        targetColorMesh: ['Mesh_2']

    },
    {
        name: 'Armature_1',
        index: 1,
        targetColorMesh: ['Mesh001_2']
    },
    {
        name: 'Armature_2',
        index: 2,
        targetColorMesh: ['Mesh002_3']
    },
    {
        name: 'Armature_3',
        index: 3,
        targetColorMesh: ['Mesh003_1']

    },
    {
        name: 'Armature_4',
        index: 4,
        targetColorMesh: ['Mesh004', 'Mesh004_4']

    },
    {
        name: 'Armature_5',
        index: 5,
        targetColorMesh: ['Mesh005_2']

    }
]

export class Model {
    constructor(scene) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.textureLoader = new THREE.TextureLoader();


        this.legsCollectionModel,
            this.bodyCollectionModel,
            this.weaponModel;

        this.weaponIndex = 2;
        this.legsIndex = 0;
        this.bodyIndex = 3;

        this.bone = null;

        this.legsColorMeshes = [];
        this.bodyColorMeshes = [];

        // this.
    }

    initScene() {
        if (!this.bodyCollectionModel || !this.legsCollectionModel) {
            console.warn('initScene called before models finished loading');
            return;
        }


        this.cleanModel(this.bodyCollectionModel);
        this.cleanModel(this.legsCollectionModel);
        // this.cleanModel(this.weaponCollectionModel);

        this.setModelPart(this.bodyCollectionModel, this.bodyIndex)
        this.setModelPart(this.legsCollectionModel, this.legsIndex)


        // this.setLegs();
        // this.setBody();
        // this.setWeapon();

        this.setAnimation()
    }

    cleanModel(model) {
        if (!model || !model.children) return;
        const parts = model.children
        parts.forEach((child) => {
            child.visible = false;
            // выключаем видимость всей ветки
            // child.traverse((node) => { if (node.isMesh) node.visible = false; });
        });
    }

    setModelPart(model, index) {

        if (!model || !model.children) return;
        const parts = model.children;
        const part = parts[index];
        const action = null;

        if (!part) return;
        // включаем видимость всей ветки

        console.log('name:', part.name)

        part.traverse((obj) => {
            if (obj.isMesh) console.log(obj.name);
        });

        //         part && part.children.forEach((c, i) => {
        //   console.log('  child', i, c.name, c.type, c.children?.length);
        // });


        part.visible = true;
    }

    pathToRoot(obj) {
        const names = [];
        let p = obj;
        while (p) { names.unshift(p.name || p.type); p = p.parent; }
        return names.join(' > ');
    }

    setColor(color) {
        const container = document.querySelector('.mutable-icon');

        const type = container.getAttribute('data-type');

        const collection = this[`${type}CollectionModel`];
        let index = this[`${type}Index`];

        const part = collection.children[index];

        const dataArray = type === 'body' ? bodyData : legsData;

        const data = dataArray.find((item) => {

            if (item.name === part.name)
                return true;
        });


        if (data.targetColorMesh.length > 0) {

            data.targetColorMesh.forEach((meshName) => {
                let mesh = null;

                mesh = this[`${type}ColorMeshes`][index].get(meshName);

                if (mesh) {
                    const colorObj = this.parseCssColorToThree(color);

                    mesh.material.color.copy(colorObj.color);
                }
            })
        }

    }
    async loadWeapon() {
        const gltf = await this.loader.loadAsync('/models/guns.glb')
        const model = gltf.scene;

        model.traverse((obj) => {
            if (obj.isMesh) {
                console.log('Found weapon:', obj.name);
            }
        });

        model.scale.set(0.65, 0.65, 0.65);

        const group = new THREE.Group();

        group.add(model)
        model.position.set(-1, 0, 0);
        model.rotation.set(0, -Math.PI / 2, 0);

        group.rotation.set(0, Math.PI / 3, -Math.PI / 12);
        group.position.set(-1.2, -0.3, 0.5);


        this.weapon = model;

        this.scene.add(group)

        return model;
    }

    async loadBody() {

        const gltf = await this.loader.loadAsync('/models/bodies.glb')
        const model = gltf.scene;

        this.mixer_body = new THREE.AnimationMixer(model);

        gltf.animations.forEach((clip) => {
            const action = this.mixer_body.clipAction(clip);
            action.play();
        });

        const parts = model.children

        parts.forEach((child, i) => {
            child.visible = false;
            child.scale.set(0.02, 0.02, 0.02);

            const map = new Map()

            child.traverse((obj) => {
                if (obj.isMesh) {
                    map.set(obj.name, obj);
                }
            });

            this.bodyColorMeshes.push(map);
        });

        this.scene.add(model)
        this.bodyCollectionModel = model;

        return model;
    }

    async loadLegs() {
        const gltf = await this.loader.loadAsync('/models/legs.glb');
        const model = gltf.scene;


        this.mixer_legs = new THREE.AnimationMixer(model);
        this.animation = gltf.animations

        const parts = model.children

        // console.log(gltf.animations)
        // console.log(gltf.animations[0])

        gltf.animations.forEach((clip) => {
            const action = this.mixer_legs.clipAction(clip);
            action.play();
        });


        parts.forEach((child, i) => {
            child.visible = false;
            child.scale.set(0.2, 0.2, 0.2);
            child.position.y = -2.25;
            child.rotation.z = Math.PI;

            const map = new Map();

            child.traverse((obj) => {
                if (obj.isBone) {
                    // console.log(child.name, ":", obj.name)
                }


                if (obj.isMesh) {
                    map.set(obj.name, obj);
                }
            })

            this.legsColorMeshes.push(map);

            // console.log('')
        });

        this.scene.add(model);

        this.legsCollectionModel = model;

        return model;
    }

    async loadModels() {
        await Promise.all([this.loadBody(), this.loadLegs(), this.loadWeapon()]);
        this.initScene();
        this.initRandomButton();
    }

    rollParts(side = '', type = '') {
        const collection = this[`${type}CollectionModel`];
        let index = this[`${type}Index`];

        const count = collection.children.length;
        const delta = side === 'left' ? -1 : side === 'right' ? 1 : 0;
        index = ((index + delta) % count + count) % count; // безопасное модуло

        this[`${type}Index`] = index;
        if (type == 'legs') this.setAnimation();

        this.cleanModel(collection);
        this.setModelPart(collection, index);
    }

    initRandomButton() {
        const random = document.querySelector('.random');
        const audio = document.getElementById('dice');

        random.addEventListener('pointerdown', () => {
            this.cleanModel(this.bodyCollectionModel);
            this.cleanModel(this.legsCollectionModel);

            audio.play();

            this.bodyIndex = Math.floor(Math.random() * this.bodyCollectionModel.children.length);
            this.legsIndex = Math.floor(Math.random() * this.legsCollectionModel.children.length);

            this.setModelPart(this.bodyCollectionModel, this.bodyIndex)
            this.setModelPart(this.legsCollectionModel, this.legsIndex)

            this.setAnimation()

        })
    }



    setAnimation() {

        this.animation.forEach((clip) => {
            const action = this.mixer_legs.existingAction(clip);
            action.reset();
            action.stop();
        });

        const bodyes = this.bodyCollectionModel.children;
        const legs = this.legsCollectionModel.children;
        const weapon = this.weapon;

        if (this.bone) {
            this.scene.attach(this.bodyCollectionModel);
        }

        this.animation.forEach((clip) => {
            const action = this.mixer_legs.existingAction(clip);
            action.play()
        });

        const leg = legs[this.legsIndex];

        // console.log(leg.name)

        const data = legsData.find((data) => {
            return leg.name === data.name
        })

        leg.traverse((obj) => {
            if (obj.isBone && obj.name === data.bone) {
                this.bone = obj;
            }
        })

        // this.restartLegsAnimation();
        this.bodyCollectionModel.userData.attachedToBone = true;
        this.bone.attach(this.bodyCollectionModel);
        this.bone.attach(this.weapon);
    }

    parseCssColorToThree(cssColor) {
        // cssColor может быть: "rgb(...)", "rgba(...)", "#rrggbb", "color(srgb ... / a)"
        if (!cssColor || typeof cssColor !== 'string') {
            return { color: new THREE.Color(1, 1, 1), alpha: 1 };
        }

        // 1) Формат CSS4: color(srgb R G B / A)
        const css4 = cssColor.match(/color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i);
        if (css4) {
            const r = parseFloat(css4[1]);
            const g = parseFloat(css4[2]);
            const b = parseFloat(css4[3]);
            const a = css4[4] !== undefined ? parseFloat(css4[4]) : 1;
            const col = new THREE.Color(r, g, b);
            // CSS gives sRGB values (0..1) — конвертируем в линейное пространство
            col.convertSRGBToLinear();
            return { color: col, alpha: a };
        }

        // 2) rgb(...) / rgba(...)
        const rgb = cssColor.match(/rgba?\(\s*([^\)]+)\)/i);
        if (rgb) {
            const parts = rgb[1].split(',').map(p => p.trim()).map(parseFloat);
            const r = parts[0] / 255;
            const g = parts[1] / 255;
            const b = parts[2] / 255;
            const a = parts[3] !== undefined ? parts[3] : 1;
            const col = new THREE.Color(r, g, b);
            col.convertSRGBToLinear();
            return { color: col, alpha: a };
        }

        // 3) hex или именованный цвет — let THREE handle it, but convert to linear
        try {
            const col = new THREE.Color(cssColor);
            // three.js конструктор может вернуть цвет в линейном пространстве? 
            // Надёжнее явно конвертировать sRGB->linear
            col.convertSRGBToLinear();
            return { color: col, alpha: 1 };
        } catch (e) {
            // fallback white
            return { color: new THREE.Color(1, 1, 1), alpha: 1 };
        }
    }
}