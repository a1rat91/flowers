import {
    Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild,
    ViewEncapsulation } from '@angular/core';

import {
    Scene, WebGLRenderer, OrthographicCamera, TextureLoader, LinearFilter, RepeatWrapping, ShaderMaterial,
    PlaneBufferGeometry, Mesh, Vector2, Camera } from 'three';
import {vertex as vertex} from './shader';
import {fragment as fragment} from './shader';
import {mod} from './utils';
import {TweenMax, Expo} from 'gsap';
import {DistortionSliderService} from '../../services/distortion-slider.service';
import {TimelineMax} from 'gsap';



@Component({
    selector: 'app-distortion-slider',
    templateUrl: './distortion-slider.component.html',
    styleUrls: ['./distortion-slider.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DistortionSliderComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('slider', {static: true}) slider: ElementRef;
    @ViewChild('distortionSliderCurtain', {static: true}) distortionSliderCurtain: ElementRef;
    @Output() onAnimationEndEvent: EventEmitter<any> = new EventEmitter();
    @Output() onLoadEnd: EventEmitter<any> = new EventEmitter();
    @Input() images: string[];
    displacement: string;
    intensity: number;
    speedIn: number;
    speedOut: number;
    ease;
    preserveAspectRatio: boolean;
    interactionVelocity;
    isInteractive: boolean;
    angle: number;
    currentImage;
    scene: Scene;
    renderer;
    mat;
    textures;
    disp;
    nextImage;
    imagesLoaded;
    isAnimating;
    currentTransition;
    position;
    camera;
    slideIndex;
    newImagesArr;

    constructor(private distortionSliderService: DistortionSliderService) {
        this.displacement = 'assets/images/displacement/4.png';
        this.intensity = 0.2;
        this.speedIn = 1;
        this.speedOut = 1;
        this.ease = 'Expo.easeOut';
        this.preserveAspectRatio = true;
        this.interactionVelocity = {
            x: 7,
            y: 1
        };
        this.isInteractive = false;
        this.angle = Math.PI / 4;
        this.currentImage = -1;
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({antialias: false, alpha: true});
        this.mat = null;
        this.textures = [];
        this.disp = null;
        this.nextImage = 0;
        this.imagesLoaded = [];
        this.isAnimating = false;
        this.currentTransition = null;
        this.position = {};
    }

    ngOnInit() {
        this.cameraInit();
        this.animate();

        window.addEventListener('resize', this.onResize);
        window.addEventListener('mousemove', this.onMouseMove);

        // setInterval(() => {
        //     if (!this.slideIndex) {
        //         this.next();
        //     }
        // }, 2500);

        this.distortionSliderService.currentIndex.subscribe(slideIndex => {
            this.goTo(slideIndex);
            return this.slideIndex = slideIndex;
        });
    }

    mouseEnter() {
        // this.next();
    }

    mouseLeave() {
        // this.previous();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.newImagesArr = changes.images;
        this.images = this.newImagesArr.currentValue;
        this.imagesLoaded = [];
        this.textures = [];
        this.init();
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('resize', this.onResize);
    }

    cameraInit() {
        this.camera = new OrthographicCamera(
            this.slider.nativeElement.offsetWidth / -2,
            this.slider.nativeElement.offsetWidth / 2,
            this.slider.nativeElement.offsetHeight / 2,
            this.slider.nativeElement.offsetHeight / -2,
            1,
            1000
        );
        this.camera.position.z = 1;
        return this.camera;
    }

    initScene() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xffffff, 0.0);
        this.renderer.setSize(this.slider.nativeElement.offsetWidth, this.slider.nativeElement.offsetHeight);
        this.slider.nativeElement.appendChild(this.renderer.domElement);
    }

    render = () => this.renderer.render(this.scene, this.camera);

    transitionIn() {
        this.currentTransition = TweenMax.to(this.mat.uniforms.dispFactor, this.speedIn, {
            value: 1,
            ease: this.ease,
            onUpdate: this.render,
            onComplete: this.onAnimationEnd,
            paused: true
        });
        this.currentTransition.play();
    }

    transitionOut() {
        this.currentTransition = TweenMax.to(this.mat.uniforms.dispFactor, this.speedOut, {
            value: 0,
            ease: this.ease,
            onUpdate: this.render,
            onComplete: this.onAnimationEnd,
            paused: true
        });
        this.currentTransition.play();
    }

    onAnimationEnd = () => {
        this.isAnimating = false;
        this.onAnimationEndEvent.emit('animationEnd');
        this.render();
    }

    assignTexturesToMaterial() {
        this.mat.uniforms.texture1.value = this.textures[this.currentImage];
        this.mat.uniforms.texture2.value = this.textures[this.nextImage];
    }

    resetValuesAfterAnimation() {
        this.currentImage = this.nextImage;
        this.mat.uniforms.dispFactor.value = 0;
    }

    previous() {
        // console.log('prev');
        // if (this.isAnimating) {
        //     return;
        // }
        // Skip animation if the materials are not ready
        if (this.mat === null) {
            this.currentImage = mod((this.currentImage - 1), (this.textures.length));
            return;
        }
        this.isAnimating = true;
        this.mat.uniforms.dispFactor.value = 1;
        this.nextImage = mod((this.currentImage - 1), (this.textures.length));
        this.mat.uniforms.texture1.value = this.textures[this.nextImage];
        this.mat.uniforms.texture2.value = this.textures[this.currentImage];
        this.transitionOut();
        this.currentImage = this.nextImage;
    }

    next(nextImage = null) {
        // if (this.isAnimating) {
        //     return;
        // }
        // Skip animation if the materials are not ready
        if (this.mat === null) {
            this.currentImage = mod((this.currentImage + 1), (this.textures.length));
            return;
        }
        this.isAnimating = true;
        this.nextImage = nextImage !== null ? nextImage : mod((this.currentImage + 1), (this.textures.length));
        this.assignTexturesToMaterial();
        this.transitionIn();
        this.resetValuesAfterAnimation();
    }

    loadTextures() {
        this.images.forEach((image, index) => {
            const textureLoaded = this.insertImage(image, index);
            this.imagesLoaded.push(textureLoaded);
        });
        const loader = new TextureLoader();
        loader.crossOrigin = '';
        this.disp = loader.load(this.displacement, this.render);
        this.disp.wrapS = RepeatWrapping;
        this.disp.wrapT = RepeatWrapping;
    }

    initShaderMaterial() {
        const ratio = {
            width: this.preserveAspectRatio ? this.slider.nativeElement.offsetWidth : this.textures[this.currentImage].image.naturalWidth,
            height: this.preserveAspectRatio ? this.slider.nativeElement.offsetHeight : this.textures[this.currentImage].image.naturalHeight
        };
        this.mat = new ShaderMaterial({
            uniforms: {
                intensity1: {type: 'f', value: this.intensity},
                intensity2: {type: 'f', value: this.intensity},
                dispFactor: {type: 'f', value: 0.0},
                angle1: {type: 'f', value: this.angle},
                angle2: {type: 'f', value: -Math.PI + this.angle},
                texture1: {type: 't', value: this.textures[this.currentImage]},
                texture2: {type: 't', value: this.textures[this.nextImage]},
                disp: {type: 't', value: this.disp},
                resolution: {
                    type: 'v2',
                    value: new Vector2(ratio.width, ratio.height),
                },
                imageResolution: {
                    type: 'v2',
                    value: new Vector2(
                        this.textures[this.currentImage].image.naturalWidth,
                        this.textures[this.currentImage].image.naturalHeight
                    ),
                },
                sliderResolution: {
                    type: 'v2',
                    value: new Vector2(
                        this.slider.nativeElement.offsetWidth,
                        this.slider.nativeElement.offsetHeight
                    ),
                },
                u_rgbPosition: {
                    type: 'v2',
                    value: new Vector2(window.innerWidth / 2, window.innerHeight / 2)
                },
                u_rgbVelocity: {
                    type: 'v2',
                    value: new Vector2(1, 1)
                }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            opacity: 1.0,
        });
        const geometry = new PlaneBufferGeometry(this.slider.nativeElement.offsetWidth, this.slider.nativeElement.offsetHeight, 1);
        const object = new Mesh(geometry, this.mat);
        this.scene.add(object);
    }

    init() {
        this.initScene();
        this.loadTextures();
        Promise.all(this.imagesLoaded).then(() => {
            this.initShaderMaterial();
            this.onLoadEnd.emit('loaded');

            new TimelineMax()
                .to(this.distortionSliderCurtain.nativeElement, 2, {x: '100%', ease: Expo.easeOut });

            this.render();
        });
    }


    onResize = () => {
        const ratio = {
            width: this.preserveAspectRatio ? this.slider.nativeElement.offsetWidth : this.textures[this.currentImage].image.naturalWidth,
            height: this.preserveAspectRatio ? this.slider.nativeElement.offsetHeight : this.textures[this.currentImage].image.naturalHeight
        };
        this.renderer.setSize(this.slider.nativeElement.offsetWidth, this.slider.nativeElement.offsetHeight);
        this.camera.aspect = this.slider.nativeElement.innerWidth / this.slider.nativeElement.innerHeight;
        this.camera.updateProjectionMatrix();
        this.mat.uniforms.resolution.value.set(ratio.width, ratio.height);
        this.mat.uniforms.sliderResolution.value.set(this.slider.nativeElement.offsetWidth, this.slider.nativeElement.offsetHeight);
        this.render();
    }

    play() {
        if (this.currentTransition) {
            this.currentTransition.play();
        }
    }

    pause() {
        if (this.currentTransition) {
            this.currentTransition.pause();
        }
    }

    insertImage(path, index = this.textures.length) {
        const loader = new TextureLoader();
        loader.crossOrigin = '';
        return new Promise((resolve) => {
            const texture = loader.load(path, () => {
                this.render();
                resolve();
            });
            texture.magFilter = LinearFilter;
            texture.minFilter = LinearFilter;
            this.textures.splice(index, 0, texture);
        });
    }

    removeImage(index) {
        if (index !== this.currentImage) {
            this.textures.splice(index, 1);
        }
    }

    goTo(index) {
        if (index >= 0 && index < this.textures.length) {
            this.next(index);
        }
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    }

    onMouseMove(e) {
        if (this.isInteractive && this.mat) {
            const sliderPosition = this.slider.nativeElement.getBoundingClientRect();
            this.position = {
                x: e.clientX - sliderPosition.left,
                y: e.clientY - sliderPosition.top
            };
            this.mat.uniforms.u_rgbPosition.value = new Vector2(
                this.position.x,
                this.position.y
            );
            this.mat.uniforms.u_rgbVelocity.value = new Vector2(
                this.interactionVelocity.x,
                this.interactionVelocity.y
            );
        }
    }
}
