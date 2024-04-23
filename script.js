import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollSmoother from 'scroll-smooth'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)


const parameters = {
    materialColor: '#ff0000'
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//change color of scene
// scene.background = new THREE.Color('#002352');

/**
 * Objects
 */

// Dracoloader batch loads all models on the website allowing for faster loads during the experience 
const dracoLoader = new DRACOLoader()

const gltfloader = new GLTFLoader()
dracoLoader.setDecoderPath('./static/draco')
gltfloader.setDRACOLoader(dracoLoader)

/**
 * Sections 
 */

let mixer = null

gltfloader.load(
    './static/models/me_anim.glb',
    (gltf) => {
        //gltf.scene.scale.set(1.5, 1.5, 3.5)
        gltf.scene.position.set(0, -0.95, -0.5)
        // gltf.scene.position.set(0, -0.5, 2)
        scene.add(gltf.scene)

        /**
        * ANIMATION LOADER 
        */

        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    }
)


//Section 1

//GOLDEN GATE BRIDGE
gltfloader.load(
    './static/models/Golden_Gate.glb',
    (gltf) => {
        gltf.scene.position.set(2.2, -0.9, -5)
        gltf.scene.rotation.set(0, -0.95, 0)
        gltf.scene.scale.set(1.1, 1.1, 1.1)
        scene.add(gltf.scene)
    }
)


//Section 2 - SYNESTHESIA STUDIO
gltfloader.load(
    './static/models/Synesthesia_Studio.glb',
    (gltf) => {
        gltf.scene.position.set(0.5, -2.5, -41)
        gltf.scene.scale.set(5, 5, 5)
        gltf.scene.rotation.set(0, 0, 0)
        scene.add(gltf.scene)
    }
)

//Section 3 - 5CEO STRUCTURE
gltfloader.load(
    './static/models/5ceo.glb',
    (gltf) => {
        gltf.scene.position.set(-0.3, -0.5, -100)
        scene.add(gltf.scene)
    }
)

//Section 4 - DAFFODILS ISLAND 
gltfloader.load(
    './static/models/daffodils_island.glb',
    (gltf) => {
        gltf.scene.position.set(-0.1, -0.5, -133)
        gltf.scene.rotation.set(0, -1.65, 0)
        scene.add(gltf.scene)
    }
)

//Section 5 - PHONE
gltfloader.load(
    './static/models/phone.glb',
    (gltf) => {
        gltf.scene.position.set(0.5, -1.1, -173)
        gltf.scene.rotation.set(-1.2, 0, 0)
        gltf.scene.scale.set(0.2, 0.2, 0.2)
        scene.add(gltf.scene)
    }
)


//Section 6 - APPLE STORE MICHIGAN CHICAGO 
gltfloader.load(
    './static/models/Apple_Store.glb',
    (gltf) => {
        gltf.scene.position.set(4.25, -1.25, -215)
        gltf.scene.rotation.set(0, -1.6, 0)
        gltf.scene.scale.set(25, 25, 25)
        scene.add(gltf.scene)
    }
)


const loader = new THREE.TextureLoader()
const bgTexture = loader.load('./static/images/bg1.png')
bgTexture.colorSpace = THREE.SRGBColorSpace
scene.background = bgTexture

function render(time) {
 
   const canvasAspect = canvas.clientWidth / canvas.clientHeight;
   const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
   const aspect = imageAspect / canvasAspect;
  
   bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
   bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;

   bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
   bgTexture.repeat.y = aspect > 1 ? 1 : aspect;
 }

const objectDistance = 4
const sectionMeshes = []



// Ambient Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 3)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 60, 100)


const pointLight2 = new THREE.PointLight(0xffffff, 60, 100)

const pointLight3 = new THREE.PointLight(0xffffff, 60, 150)

const pointLight4 = new THREE.PointLight('#FFC800', 2, 5)

const pointLight5 = new THREE.PointLight('#FFC800', 2, 5)

//golsing style light
// const pointLight6 = new THREE.PointLight('#ff77ff', 10, 20)
// const pointLight7 = new THREE.PointLight('#0000cd', 10, 20)

const pointLight6 = new THREE.PointLight('#FFC800', 10, 20)
const pointLight7 = new THREE.PointLight('white', 30, 20)


scene.add(pointLight, pointLight2, pointLight3, pointLight4, pointLight5, pointLight6, pointLight7)

pointLight.position.set(0, 3, -224)
pointLight2.position.set(0, 3, -233)
pointLight3.position.set(0, 1, -173)
pointLight4.position.set(1.25, -0.45, -214)
pointLight5.position.set(3.25, -0.45, -214)

pointLight6.position.set(4, 0.9, -5)
pointLight7.position.set(-3.5, 0.9, -3.5)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Group 
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.toneMapping = THREE.ACESFilmicToneMapping;

/**
 * Scroll Camera 
 */

let scrollY = window.scrollY
let currentSection = 0

// loading sections
const sections =
    [
        { zCenter: 1, content: 'section1' }, // At Z = 1
        { zCenter: -40, content: 'section2' }, // At Z = -40
        { zCenter: -90, content: 'section3' }, // At Z = -90
        { zCenter: -130, content: 'section4' }, // At Z = -130
        { zCenter: -170, content: 'section5' }, // At Z = -170
        { zCenter: -215, content: 'section6' }, // At Z = -215
    ]

let currentSectionIndex = 0
let isTransitioning = false


// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.001, 30)
// camera.position.z = sections[0].zCenter
camera.position.z = sections[0].zCenter
camera.position.y = 4
cameraGroup.add(camera)

// Debounce 
let debounceTimer
const debounceDelay = 0.1

/**
 * NEW SCROLL 
 */

/**
 * Support for IOS 
 */

let touchStartY = 0;
let touchEndY = 0;
const touchSensitivity = 0.9; // Adjust sensitivity as needed

// Event listener for touchstart
window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
}, false);

// Event listener for touchmove
window.addEventListener('touchmove', function (e) {
    touchEndY = e.touches[0].clientY;
   
}, false);

// Event listener for touchend
window.addEventListener('touchend', function (e) {
    // Determine swipe direction
    const direction = touchStartY - touchEndY > 0 ? 1 : -1;

    // Apply the debounce mechanism to the touch scroll as well
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        handleScroll(direction);
    }, debounceDelay);
}, false);

//Function to handle scrolling based on direction

// working scroll but stuttering and slow 
function handleScroll(direction) {
    if (isTransitioning) return;

    const jumpFurther = 10;
    const moveAmount = direction * touchSensitivity * jumpFurther;
    const targetZ = camera.position.z - moveAmount;

    // Animate camera to the target position
    gsap.to(camera.position, {
        z: targetZ,
        duration: 0.1, // Adjust duration as needed
        ease: "power4.out",
        onUpdate: function () {
            // renderer.render(scene, camera);
            updateText(getCurrentSectionIndex(camera.position.z));
        },
        onComplete: function () {
            isTransitioning = false;
        }
    })

    // gsap.to(camera.position, {
    //     z: targetZ,
    //     duration: 0.1, // Adjust duration as needed
    //     ease: "power4.out",
    //     onUpdate: function () {
    //         renderer.render(scene, camera);
    //         updateText(getCurrentSectionIndex(camera.position.z));

    //         //Polygon and scene complexity display 
    //         // console.log("Scene polycount:", renderer.info.render.triangles)
    //         // console.log("Active Drawcalls:", renderer.info.render.calls)
    //         // console.log("Textures in Memory", renderer.info.memory.textures)
    //         // console.log("Geometries in Memory", renderer.info.memory.geometries)
    //     },
    //     onComplete: function () {

    //         // Check if the camera reaches the end or beginning, then loop
    //         if (camera.position.z > sections[0].zCenter) {
    //             camera.position.z = sections[sections.length - 1].zCenter;
    //             updateText(sections.length - 1);

    //         } else if (camera.position.z < sections[sections.length - 1].zCenter) {
    //             camera.position.z = sections[0].zCenter;

    //             updateText(0);
    //         }

    //         isTransitioning = false;
    //     }
    // })

}

// Inertia test 
// Function to handle scrolling based on direction
// function handleScroll(direction) {
//     if (isTransitioning) return;

//     // const jumpFurther = 10;
//     const moveAmount = direction * touchSensitivity;
//     let targetZ = camera.position.z - moveAmount;

//     // Add inertia effect
//     const inertiaFactor = 0.9; // Adjust inertia factor as needed
//     const inertiaThreshold = 0.1; // Threshold to stop inertia
//     let inertiaSpeed = moveAmount * inertiaFactor;

//     // Animate camera to the target position
//     function animateScroll() {
//         targetZ -= inertiaSpeed;
//         inertiaSpeed *= inertiaFactor;

//         // Stop animation if inertia speed is below threshold
//         if (Math.abs(inertiaSpeed) < inertiaThreshold) {
//             cancelAnimationFrame(animationFrame);
//             isTransitioning = false;
//             return;
//         }

//         gsap.to(camera.position, {
//             z: targetZ,
//             duration: 0.1, // Adjust duration as needed
//             ease: "power4.out",
//             onUpdate: function () {
//                 // renderer.render(scene, camera);
//                 updateText(getCurrentSectionIndex(camera.position.z));
//             },
//             onComplete: function () {
//                 // Continue animation until inertia stops
//                 animationFrame = requestAnimationFrame(animateScroll);
//             }
//         });
//     }

//     // Start the animation
//     animateScroll();
// }



/**
 * Cursor 
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    // console.log(event.clientX, event.clientY)

    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

    // console.log(cursor)

})

// Event listener for smooth scroll using gsap
window.addEventListener('wheel', (event) => {
    if (isTransitioning) return;


    // const jumpFurther = 2;
    const moveAmount = (event.deltaY * 0.02); // Adjust sensitivity as needed
    const targetZ = camera.position.z - moveAmount;

    // Animate camera to the target position
    gsap.to(camera.position, {
        z: targetZ,
        duration: 0.1, // Adjust duration as needed
        ease: "circ.out",
        onUpdate: function () {
            renderer.render(scene, camera);
            updateText(getCurrentSectionIndex(camera.position.z));

            //Polygon and scene complexity display 
            // console.log("Scene polycount:", renderer.info.render.triangles)
            // console.log("Active Drawcalls:", renderer.info.render.calls)
            // console.log("Textures in Memory", renderer.info.memory.textures)
            // console.log("Geometries in Memory", renderer.info.memory.geometries)
        },
        onComplete: function () {

            // Check if the camera reaches the end or beginning, then loop
            if (camera.position.z > sections[0].zCenter) {
                camera.position.z = sections[sections.length - 1].zCenter;
                updateText(sections.length - 1);

            } else if (camera.position.z < sections[sections.length - 1].zCenter) {
                camera.position.z = sections[0].zCenter;

                updateText(0);
            }

            isTransitioning = false;
        }
    })
})




// Smooth scroll to section logic
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const targetZ = parseFloat(targetSection.dataset.z); // Assuming you set the zCenter of each section as a data attribute
        const targetPosition = new THREE.Vector3(0, 0, targetZ);
        // gsap.to(camera.position, { duration: 1, ease: 'circ.out', ...targetPosition });

        //Test Test Test 
        gsap.to(camera.position, {
            z: targetZ,
            duration: 1, // Adjust duration as needed
            ease: "circ.out",
            onUpdate: function () {
                renderer.render(scene, camera);
                updateText(getCurrentSectionIndex(camera.position.z));


                //Polygon and scene complexity display 
                // console.log("Scene polycount:", renderer.info.render.triangles)
                // console.log("Active Drawcalls:", renderer.info.render.calls)
                // console.log("Textures in Memory", renderer.info.memory.textures)
                // console.log("Geometries in Memory", renderer.info.memory.geometries)
            },
            onComplete: function () {
                isTransitioning = false;

            }
        })

        // Update the displayed text content based on the clicked section
        updateText(parseInt(targetId.replace('section', '')) - 1);
    });
});

// Function to determine the current section index based on camera position
function getCurrentSectionIndex(zPosition) {
    for (let i = 0; i < sections.length; i++) {
        if (zPosition > sections[i].zCenter) {
            return i;
        }
    }
    return sections.length - 1;
}

//showing stats 

// // Function to update the displayed text based on the current section index
function updateText(currentSectionIndex) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the section corresponding to the current index
    const sectionElement = document.querySelector(`#section${currentSectionIndex + 1}`);
    if (sectionElement) {
        sectionElement.style.display = 'flex';
        console.log('camera is at#', camera.position)
    }
}



/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // console.log(scrollY)


    // Animate Camera 
    camera.position.y = - scrollY / sizes.height * objectDistance

    if (mixer) {
        mixer.update(deltaTime)
    }

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    // Animate meshes 
    for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12

    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

