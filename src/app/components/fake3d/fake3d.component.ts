import {ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';

import {fragmentGlsl as fragment} from './shaders/fragment';
import {vertexGlsl as vertex} from './shaders/vertex';

// import { GyroNorm } from 'gyronorm';
import {Uniform, Rect, loadImages, clamp} from './utils';

// console.log(GyroNorm);


// const gn = GyroNorm;

@Component({
    selector: 'app-fake3d',
    template: `
        <div class="fake3d" #fake3d>
        </div>
    `,
    styleUrls: ['./fake3d.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Fake3dComponent implements OnInit {
    public container;
    public canvas;
    public gl;
    public ratio;
    public windowWidth;
    public windowHeight;
    public mouseX;
    public mouseY;
    public mouseTargetX;
    public mouseTargetY;
    public imageOriginal;
    public imageDepth;
    public vth;
    public hth;
    public imageURLs;
    public textures;
    public startTime;
    public program;
    public width;
    public height;
    public imageAspect;
    public uResolution;
    public uRatio;
    public uThreshold;
    public uMouse;
    public uTime;
    public billboard;
    public positionLocation;
    public maxTilt;
    @ViewChild('fake3d', {static: true}) fake3d: ElementRef;
    @Input() image;
    @Input() depf;
    @Input() verticalThreshold;
    @Input() horizontalThreshold;

    constructor(private ngZone: NgZone) {
    }

    public ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.container = this.fake3d.nativeElement;
            this.canvas = document.createElement('canvas');
            this.container.appendChild(this.canvas);
            this.gl = this.canvas.getContext('webgl');
            this.ratio = window.devicePixelRatio;
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            this.mouseX = 0;
            this.mouseY = 0;

            this.mouseTargetX = 0;
            this.mouseTargetY = 0;

            this.imageOriginal = this.image;
            this.imageDepth = this.depf;
            this.vth = this.verticalThreshold;
            this.hth = this.horizontalThreshold;

            this.imageURLs = [
                this.imageOriginal,
                this.imageDepth
            ];
            this.textures = [];


            this.startTime = new Date().getTime(); // Get start time for animating

            this.createScene();
            this.addTexture();
            this.mouseMove();
            this.gyro();
            this.resize();
            }
        );
    }

    addShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        const isCompiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!isCompiled) {
            throw new Error('Shader compile error: ' + this.gl.getShaderInfoLog(shader));
        }
        this.gl.attachShader(this.program, shader);
    }

    resizeHandler() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width * this.ratio;
        this.canvas.height = this.height * this.ratio;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        let a1;
        let a2;

        if (this.height / this.width < this.imageAspect) {
            a1 = 1;
            a2 = (this.height / this.width) / this.imageAspect;
        } else {
            a1 = (this.width / this.height) * this.imageAspect;
            a2 = 1;
        }
        this.uResolution.set(this.width, this.height, a1, a2);
        this.uRatio.set(1 / this.ratio);
        this.uThreshold.set(this.hth, this.vth);
        this.gl.viewport(0, 0, this.width * this.ratio, this.height * this.ratio);
    }

    resize() {
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler.bind(this));
    }

    createScene() {

        this.program = this.gl.createProgram();

        this.addShader(vertex, this.gl.VERTEX_SHADER);
        this.addShader(fragment, this.gl.FRAGMENT_SHADER);

        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);


        this.uResolution = new Uniform('resolution', '4f', this.program, this.gl);
        this.uMouse = new Uniform('mouse', '2f', this.program, this.gl);
        this.uTime = new Uniform('time', '1f', this.program, this.gl);
        this.uRatio = new Uniform('pixelRatio', '1f', this.program, this.gl);
        this.uThreshold = new Uniform('threshold', '2f', this.program, this.gl);
        // create position attrib
        this.billboard = new Rect(this.gl);
        this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(this.positionLocation);
        this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    addTexture() {
        const that = this;
        const gl = that.gl;
        loadImages(this.imageURLs, that.start.bind(this));
    }

    start(images) {
        const that = this;
        const gl = that.gl;


        this.imageAspect = images[0].naturalHeight / images[0].naturalWidth;
        // tslint:disable-next-line
        for (let i = 0; i < images.length; i++) {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);

            // Set the parameters so we can render any size image.
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            // Upload the image into the texture.
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[i]);
            this.textures.push(texture);
        }

        // lookup the sampler locations.
        // tslint:disable-next-line
        const u_image0Location = this.gl.getUniformLocation(this.program, 'image0');
        // tslint:disable-next-line
        const u_image1Location = this.gl.getUniformLocation(this.program, 'image1');

        // set which texture units to render with.
        this.gl.uniform1i(u_image0Location, 0); // texture unit 0
        this.gl.uniform1i(u_image1Location, 1); // texture unit 1

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0]);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[1]);


        // start application
        this.resize();
        this.render();
    }


    gyro() {

        // const that = this;

        // this.maxTilt = 15;


        // const rotationCoef = 0.15;

        // gn.init({ gravityNormalized: true }).then(() => {
        //   gn.start((data) => {

        //     const y = data.do.gamma;
        //     const x = data.do.beta;

        //     that.mouseTargetY = clamp(x, -that.maxTilt, that.maxTilt) / that.maxTilt;
        //     that.mouseTargetX = -clamp(y, -that.maxTilt, that.maxTilt) / that.maxTilt;

        //   });
        // }).catch((e) => {
        //   console.log('not supported');
        // });

    }

    mouseMove() {
        const that = this;
        document.addEventListener('mousemove', (e) => {
            const halfX = that.windowWidth / 2;
            const halfY = that.windowHeight / 2;

            that.mouseTargetX = (halfX - e.clientX) / halfX;
            that.mouseTargetY = (halfY - e.clientY) / halfY;


        });
    }


    render() {
        const now = new Date().getTime();
        const currentTime = ( now - this.startTime ) / 1000;
        this.uTime.set(currentTime);
        // inertia
        this.mouseX += (this.mouseTargetX - this.mouseX) * 0.05;
        this.mouseY += (this.mouseTargetY - this.mouseY) * 0.05;


        this.uMouse.set(this.mouseX, this.mouseY);

        // render
        this.billboard.render(this.gl);
        requestAnimationFrame(this.render.bind(this));
    }
}
