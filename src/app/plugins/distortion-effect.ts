import * as THREE from 'three';
import {TweenLite, Expo} from 'gsap';

export const DistortionEffect = opts => {
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

    const images = opts.images;
    let image;
    let sliderImages = [];
    const canvasWidth = images[0].parentNode.clientWidth;
    const canvasHeight = images[0].parentNode.clientWidth * 1.085;
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
    loader.crossOrigin = 'anonymous';

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
        const pagButtons = Array.from(document.getElementById('pagination').querySelectorAll('button'));
        let isAnimating = false;

        pagButtons.forEach((el) => {

            el.addEventListener('click', function() {

                if (!isAnimating) {

                    isAnimating = true;

                    document.getElementById('pagination').querySelectorAll('.active')[0].className = '';
                    this.className = 'active';

                    const slideId = parseInt(this.dataset.slide, 10);

                    mat.uniforms.nextImage.value = sliderImages[slideId];
                    // mat.uniforms.nextImage.needsUpdate = true;

                    TweenLite.to(mat.uniforms.dispFactor, 1, {
                        value: 1,
                        ease: 'Expo.easeInOut',
                        onComplete() {
                            mat.uniforms.currentImage.value = sliderImages[slideId];
                            // mat.uniforms.currentImage.needsUpdate = true;
                            mat.uniforms.dispFactor.value = 0.0;
                            isAnimating = false;
                        }
                    });

                    // const slideTitleEl = document.getElementById('slide-title');
                    // const slideStatusEl = document.getElementById('slide-status');
                    // const nextSlideTitle = document.querySelectorAll(`[data-slide-title="${slideId}"]`)[0].innerHTML;
                    // const nextSlideStatus = document.querySelectorAll(`[data-slide-status="${slideId}"]`)[0].innerHTML;

                    // TweenLite.fromTo(slideTitleEl, 0.5,
                    //   {
                    //     autoAlpha: 1,
                    //     filter: 'blur(0px)',
                    //     y: 0
                    //   },
                    //   {
                    //     autoAlpha: 0,
                    //     filter: 'blur(10px)',
                    //     y: 20,
                    //     ease: 'Expo.easeIn',
                    //     onComplete() {
                    //       slideTitleEl.innerHTML = nextSlideTitle;
                    //
                    //       TweenLite.to(slideTitleEl, 0.5, {
                    //         autoAlpha: 1,
                    //         filter: 'blur(0px)',
                    //         y: 0,
                    //       });
                    //     }
                    //   });
                    //
                    // TweenLite.fromTo(slideStatusEl, 0.5,
                    //   {
                    //     autoAlpha: 1,
                    //     filter: 'blur(0px)',
                    //     y: 0
                    //   },
                    //   {
                    //     autoAlpha: 0,
                    //     filter: 'blur(10px)',
                    //     y: 20,
                    //     ease: 'Expo.easeIn',
                    //     onComplete() {
                    //       slideStatusEl.innerHTML = nextSlideStatus;
                    //
                    //       TweenLite.to(slideStatusEl, 0.5, {
                    //         autoAlpha: 1,
                    //         filter: 'blur(0px)',
                    //         y: 0,
                    //         delay: 0.1,
                    //       });
                    //     }
                    //   });

                }

            });

        });

    };

    addEvents();

    window.addEventListener('resize', e => {
        renderer.setSize(renderW, renderH);
    });

    const animate = () => {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    };
    animate();
};

