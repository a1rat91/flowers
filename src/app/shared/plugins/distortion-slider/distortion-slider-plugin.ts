import * as THREE from 'three';
import {TweenLite, Expo} from 'gsap';

export const DistortionSliderPlugin = opts => {
    const vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

    const fragment = `
        varying vec2 vUv;
        uniform sampler2D currentImage;
        uniform sampler2D nextImage;
        uniform float dispFactor;
        void main() {
            vec2 uv = vUv;
            vec4 _currentImage;
            vec4 _nextImage;
            float intensity = 0.3;
            vec4 orig1 = texture2D(currentImage, uv);
            vec4 orig2 = texture2D(nextImage, uv);
            _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)));
            _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)));
            vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
            gl_FragColor = finalTexture;
        }
    `;
    // document.removeChild(document.querySelector('.swiper-slide-duplicate'));

    const images = opts.images;
    const swiper = opts.swiper;
    const imagesLenght = opts.imagesLenght;

    let image;
    const sliderImages = [];
    let canvasWidth = images[0].parentNode.clientWidth;
    let canvasHeight = window.innerHeight;
    const parent = opts.parent;
    // const renderWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // const renderHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let renderW;
    let renderH;

    renderW = canvasWidth;
    renderH = canvasHeight;

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x3B181E, 1.0);
    renderer.setSize(renderW, renderH);
    parent.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = '';

    images.forEach((img) => {
        image = loader.load(img.getAttribute('src') + '?v=' + Date.now());
        image.magFilter = image.minFilter = THREE.LinearFilter;
        image.anisotropy = renderer.capabilities.getMaxAnisotropy();
        sliderImages.push(image);
    });

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3B181E);
    const camera = new THREE.OrthographicCamera(
        canvasWidth / -2.0,
        canvasWidth / 2.0,
        canvasHeight / 2.0,
        canvasHeight / -2.0,
        1,
        1000
    );

    camera.position.z = 1;

    const mat = new THREE.ShaderMaterial({
        uniforms: {
            dispFactor: {type: 'f', value: 0.0},
            currentImage: {type: 't', value: sliderImages[0]},
            nextImage: {type: 't', value: sliderImages[1]},
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0
    });

    const geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
    );
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(0, 0, 0);
    scene.add(object);

    const addEvents = () => {

        let isAnimating = false;
        let pos = 0;
        swiper.on('slideNextTransitionStart', () => {
            setTimeout(() => {
                pos++;
                if (pos > imagesLenght) {
                    pos = 0;
                }
                TweenLite.to(mat.uniforms.dispFactor, 0.6, {
                    value: 1,
                    ease: 'Expo.easeInOut',
                    onComplete: () => {

                        console.log('onComplete', pos);
                        mat.uniforms.currentImage.value = sliderImages[pos];
                        mat.uniforms.dispFactor.value = 0.0;
                        isAnimating = false;

                    }
                });
                sliderChange(pos);
            }, 600);
        });

        swiper.on('slidePrevTransitionStart', () => {
            setTimeout(() => {
                pos--;
                if (pos < 0) {
                    pos = imagesLenght;
                }
                sliderChange(pos);
                TweenLite.to(mat.uniforms.dispFactor, 0.6, {
                    value: 1,
                    ease: 'Expo.easeInOut',
                    onComplete: () => {
                        console.log('onComplete', pos);
                        mat.uniforms.currentImage.value = sliderImages[pos];
                        mat.uniforms.dispFactor.value = 0.0;
                        isAnimating = false;
                    }
                });
                console.log(pos);
            }, 600);
        });

        const sliderChange = (i) => {
            if (!isAnimating) {
                isAnimating = true;

                let slideId = pos;

                mat.uniforms.nextImage.value = sliderImages[pos];
            }
        };
    };

    addEvents();

    window.addEventListener('resize', e => {
        canvasWidth = images[0].parentNode.clientWidth;
        canvasHeight = window.innerHeight;

        renderW = canvasWidth;
        renderH = canvasHeight;

        renderer.setSize(renderW, renderH);
    });

    const animate = () => {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };
    animate();
};
