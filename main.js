import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

const canva = document.querySelector('.webgl')

const sizes = {
  width: canva.width,
  height: canva.height
}

const scene = new THREE.Scene();
scene.background
/*
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#00FF83",
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
*/


const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 5;
camera.position.y = 3.5;
scene.add(camera);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
light.intensity = 6
scene.add( light );

const renderer = new THREE.WebGLRenderer({canvas: canva, alpha: true});
renderer.setSize(sizes.width, sizes.height);


    function carregarGloria(modelo){
      const loader = new GLTFLoader();
      loader.load(
    modelo,
    (glb) => {
        console.log(glb)
        const root = glb.scene;
        root.scale.set(3.5, 3.5, 3.5);
        scene.add(root)

        const mixer = new THREE.AnimationMixer(root);
        const animations = glb.animations;
        const animationActions = {};

        animations.forEach((animation) => {
            const action = mixer.clipAction(animation);
            animationActions[animation.name] = action;
        });

       let currentAnimation = animations[0];
       let currentAction = animationActions[currentAnimation.name];
        currentAction.reset().play();


        function reproduzirAnimacao(nomeAnimacao) {
            const animacao = animations.find((animation) => animation.name === nomeAnimacao);
            const action = animationActions[animacao.name];
          
            if (action) {
              // Interrompe a animação atual
              currentAction.stop();
          
              // Define a nova animação como a animação atual
              currentAnimation = animacao;
              currentAction = action;
          
              // Reproduz a nova animação
              currentAction.reset().play();
            }
          }

  
const botaoAnimacao = document.getElementById('botaoAnimacao');
botaoAnimacao.addEventListener('click', function() {

  reproduzirAnimacao("teste3|A|iCTM")
})
        

        function animate(){
            requestAnimationFrame(animate);
            const delta = 0.01;
            mixer.update(delta);
            renderer.render(scene, camera);
        }
        animate();

        
});}


carregarGloria('gloria3.glb')




