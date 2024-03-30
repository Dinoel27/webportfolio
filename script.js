import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'


/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

/**
 * Texture Loader
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/1.png')
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture


const sky1Texture = textureLoader.load('textures/skyboxes/sky.png')
sky1Texture.colorSpace = THREE.SRGBColorSpace
const sky2Texture = textureLoader.load('textures/skyboxes/sky2.png')
sky2Texture.colorSpace = THREE.SRGBColorSpace
const sky3Texture = textureLoader.load('textures/skyboxes/sky3.png')
sky3Texture.colorSpace = THREE.SRGBColorSpace
const sky4Texture = textureLoader.load('textures/skyboxes/sky4.png')
sky4Texture.colorSpace = THREE.SRGBColorSpace
const sky5Texture = textureLoader.load('textures/skyboxes/sky5.png')
sky5Texture.colorSpace = THREE.SRGBColorSpace

sky1Texture.minFilter = THREE.LinearFilter
sky1Texture.magFilter = THREE.NearestFilter

sky2Texture.minFilter = THREE.LinearFilter
sky2Texture.magFilter = THREE.NearestFilter

sky3Texture.minFilter = THREE.LinearFilter
sky3Texture.magFilter = THREE.NearestFilter

sky4Texture.minFilter = THREE.LinearFilter
sky4Texture.magFilter = THREE.NearestFilter

sky5Texture.minFilter = THREE.LinearFilter
sky5Texture.magFilter = THREE.NearestFilter



/**
 * Mesh Objects
 */

const objectDistance = 4

const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)


const mesh4 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    material
)

const mesh5 = new THREE.Mesh(
    new THREE.SphereGeometry(2, 16, 16),
    material
)

/**
 * Setting position of the objects 
 */

mesh1.position.set(-0.5, 0, 3)
mesh1.scale.set(0.3, 0.3, 0.3)


mesh2.position.set(0.5, 0, -42)
mesh2.scale.set(0.1, 0.1, 0.1)

mesh3.position.set(-0.5, 0, -93)
mesh3.scale.set(0.1, 0.1, 0.1)

mesh4.position.set(2, 0, -133)
mesh4.scale.set(0.3, 0.3, 0.3)

mesh5.position.set(-2, 0, -195)
mesh5.scale.set(0.3, 0.3, 0.3)




/**
 * Skyboxes 
 */

const geometry = new THREE.SphereGeometry(5, 32, 32)
const skymaterial = new THREE.MeshBasicMaterial(
    {
        map: sky1Texture
    }
)

skymaterial.side = THREE.DoubleSide

const skymaterial2 = new THREE.MeshBasicMaterial(
    {
        map: sky2Texture
    }
)

skymaterial2.side = THREE.DoubleSide


const skymaterial3 = new THREE.MeshBasicMaterial(
    {
        map: sky3Texture
    }
)

skymaterial3.side = THREE.DoubleSide

const skymaterial4 = new THREE.MeshBasicMaterial(
    {
        map: sky4Texture
    }
)

skymaterial4.side = THREE.DoubleSide

const skymaterial5 = new THREE.MeshBasicMaterial(
    {
        map: sky5Texture
    }
)

skymaterial5.side = THREE.DoubleSide

const sphere = new THREE.Mesh(geometry, skymaterial)
sphere.position.set(0, -0, 1.5)

const sphere2 = new THREE.Mesh(geometry, skymaterial2)
sphere2.position.set(0, 0, -40)

const sphere3 = new THREE.Mesh(geometry, skymaterial3)
sphere3.position.set(0, 0, -90)

const sphere4 = new THREE.Mesh(geometry, skymaterial4)
sphere4.position.set(0, 0, -130)

const sphere5 = new THREE.Mesh(geometry, skymaterial4)
sphere5.position.set(0, 0, -190)

// scene.add(sphere)



/**
 * Scene add for scroll 
 */
scene.add(mesh1, mesh2, mesh3, mesh4, mesh5, sphere, sphere2, sphere3, sphere4, sphere5)
const sectionMeshes = [mesh1, mesh2, mesh3, mesh4, mesh5, sphere, sphere2, sphere3, sphere4, sphere5]

/**
 * Patricles
 */
// Geometry 
// const particlesCount = 200
// const positions = new Float32Array(particlesCount * 3)


// Warp Effect 
let LINE_COUNT = 5000
let geom = new THREE.BufferGeometry()

geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6 * LINE_COUNT), 3))
geom.setAttribute("velocity", new THREE.BufferAttribute(new Float32Array(2 * LINE_COUNT), 1))

let pos = geom.getAttribute("position")
let pa = pos.array
let vel = geom.getAttribute("velocity")
let va = vel.array

/**
 * Warp Effect
 */

function warpEffect() {
    // document.body.appendChild(renderer.domElement)

    for (let line_index = 0; line_index < LINE_COUNT; line_index++) {
        var x = Math.random() * 400 - 200
        var y = Math.random() * 200 - 100
        var z = Math.random() * 500 - 100

        var x2 = x
        var y2 = y
        var z2 = z

        //line start 
        pa[6 * line_index] = x
        pa[6 * line_index + 1] = y
        pa[6 * line_index + 2] = z

        //line end 
        pa[6 * line_index + 3] = x2
        pa[6 * line_index + 4] = y2
        pa[6 * line_index + 5] = z2

        va[2 * line_index] = va[2 * line_index + 1] = 0
    }

    let mat = new THREE.LineBasicMaterial({ color: 0xffffff })
    let lines = new THREE.LineSegments(geom, mat)
    lines.position.set(0, 0, -200)
    scene.add(lines)

    animate()
}

// Animation of warp effect particles 

function animate() {
    for (let line_index = 0; line_index < LINE_COUNT; line_index++) {
        va[2 * line_index] += 0.03
        va[2 * line_index + 1] += 0.025

        pa[6 * line_index + 2] += va[2 * line_index] // z-axis
        pa[6 * line_index + 5] += va[2 * line_index + 1] // z-axis

        if (pa[6 * line_index + 5] > 200) {
            var z = Math.random() * 200 - 100

            pa[6 * line_index + 2] = z
            pa[6 * line_index + 5] = z

            va[2 * line_index] = 0
            va[2 * line_index + 1] = 0

        }
    }

    pos.needsUpdate = true
    // renderer.render(scene, camera)
    requestAnimationFrame(animate)
}


// Ambient Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 3)
scene.add(ambientLight)

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



// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.001, 100)
camera.position.z = 5
camera.position.y = 4
cameraGroup.add(camera)

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

/**
 * Scroll Camera 
 */

let scrollY = window.scrollY
let currentSection = 0

/**
 * 3D Scroll function for testing 
 */

// loading sections
const sections =
    [
        { zCenter: 5, content: 'section1' }, // At Z = 0
        { zCenter: -40, content: 'section2' }, // At Z = -40
        { zCenter: -90, content: 'section3' }, // At Z = -90
        { zCenter: -130, content: 'section4' }, // At Z = -130
        { zCenter: -190, content: 'section5' }, // At Z = -190
    ]

let currentSectionIndex = 0
let isTransitioning = false

// Debounce 
let debounceTimer
const debounceDelay = 30

window.addEventListener('wheel', (event) => {

    clearTimeout(debounceTimer)
    

    // checking if the user is at the end of experience
    debounceTimer = setTimeout(() => {

        if (isTransitioning) return
        warpEffect()

        const direction = Math.sign(event.deltaY)

        if (currentSectionIndex == sections.length - 1 && direction > 0) {
            isTransitioning = true
            updateText(currentSectionIndex)
            warpEffect()
            moveToStart()
            return
        }

        // moving through different sections 
        let nextSectionIndex = currentSectionIndex + direction
        nextSectionIndex = Math.max(0, Math.min(nextSectionIndex, sections.length - 1))

        if (nextSectionIndex !== currentSectionIndex) {
            isTransitioning = true
            currentSectionIndex = nextSectionIndex
            warpEffect()
            moveToSection(sections[currentSectionIndex])
        }
    }, debounceDelay)

})

// function to move to the initial project 
function moveToStart() {
    currentSectionIndex = 0
    moveToSection(sections[0])
}

// function to move through different sections 
function moveToSection(section) {
    gsap.to(camera.position, {
        z: section.zCenter,
        duration: 2,
        ease: "power2.out",

        onUpdate: function () {
            
            renderer.render(scene, camera)
        },

        onStart: function () {
            // console.log(`Starting movement to ${section.content}`);
        },
        onComplete: function () {
            warpEffect()
            console.log(`Arrived at ${section.content}`);
            isTransitioning = false
            updateText(currentSectionIndex)
        }
    })
}

// updating text on each change of section
function updateText(currentSectionIndex) {

    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none'
    })

    const sectionElement = document.querySelector(`#section${currentSectionIndex + 1}`)

    if (sectionElement) {
        sectionElement.style.display = 'flex'
    }
}


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