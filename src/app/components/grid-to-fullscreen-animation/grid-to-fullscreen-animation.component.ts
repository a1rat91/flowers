import {
    AfterViewInit,
    Component, DoCheck,
    ElementRef, EventEmitter,
    Inject,
    Input, OnChanges,
    OnInit, Output,
    QueryList, SimpleChanges,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {Power1} from 'gsap';
import {DOCUMENT} from '@angular/common';
import {GridToFullscreenEffect as GridToFullscreenEffect} from '../../../assets/js/GridToFullscreenEffect.js';
// import '../../../assets/js/imagesloaded.pkgd.min.js';
declare var imagesLoaded: any;

@Component({
    selector: 'app-grid-to-fullscreen-animation',
    templateUrl: './grid-to-fullscreen-animation.component.html',
    styleUrls: ['./grid-to-fullscreen-animation.component.scss']
})
export class GridToFullscreenAnimationComponent implements AfterViewInit, OnChanges {

    currentIndex: number;
    @ViewChildren('thumbsItems') private _thumbsItems: QueryList<ElementRef>;
    @ViewChildren('fullviewItems') private _fullviewItems: QueryList<ElementRef>;
    @ViewChild('wrapper', {static: true}) private _wrapper: ElementRef;
    @ViewChild('app', {static: true}) private _app: ElementRef;
    @Input() postImage;
    @Input() lightBoxActivated;
    @Output() lightBoxStatusChanged = new EventEmitter<string>();
    transitionEffect;
    itemsWrapper;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    get thumbsItems() {
        return this._thumbsItems.map((element) => element.nativeElement);
    }
    get fullviewItems() {
        return this._fullviewItems.map((element) => element.nativeElement);
    }
    get wrapper() {
        return this._wrapper.nativeElement;
    }
    get app() {
        return this._app.nativeElement;
    }
//TODO: Получил lightBoxActivated, теперь нужно тригерить плагин
    // lightBoxStatusChanged() {
    //     console.log(this.lightBoxActivated);
    //     return this.lightBoxActivated;
    // }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.lightBoxActivated.currentValue) {
            this.transitionEffect.init();
        }
    }

    ngAfterViewInit() {

        this.itemsWrapper = this.wrapper;
        const transitionEffectDuration = 1.2;
        this.transitionEffect = this.createDemoEffect({
            activation: {type: 'mouse'},
            timing: {
                duration: transitionEffectDuration
            },
            transformation: {
                type: 'simplex',
                props: {
                    seed: '8000',
                    frequencyX: 0.2,
                    frequencyY: 0.2,
                    amplitudeX: 0.3,
                    amplitudeY: 0.3
                }
            },
            onToFullscreenStart: ({index}) => {
                this.currentIndex = index;
                // thumbs[this.currentIndex].style.opacity = 0;
                this.transitionEffect.uniforms.uSeed.value = index * 10;
                toggleFullview();
            },
            // onToGridFinish: ({index, lastIndex}) => {
            //     // thumbs[lastIndex].style.opacity = 1;
            //     fullviewItems[this.currentIndex].classList.remove('fullview__item--current');
            // },
            seed: 800,
            easings: {
                toFullscreen: Power1.easeOut,
                toGrid: Power1.easeInOut
            }
        });
        // this.transitionEffect.init();
        let toggleFullview = () => {
            this.fullviewItems[this.currentIndex].classList.add('fullview__item--current');
        };
        imagesLoaded(document.querySelectorAll('.grid__item-img'), instance => {
            // document.body.classList.remove('loading');
            // Make Images sets for the transition effect
            let images = [];
            for (let i = 0, imageSet = {}; i < instance.elements.length; i++) {
                let image = {
                    element: instance.elements[i],
                    image: instance.images[i].isLoaded ? instance.images[i].img : null
                };
                if (i % 2 === 0) {
                    imageSet = {};
                    // @ts-ignore
                    imageSet.small = image;
                }
                if (i % 2 === 1) {
                    // @ts-ignore
                    imageSet.large = image;
                    images.push(imageSet);
                }
            }
            this.transitionEffect.createTextures(images);
        });
    }

    createDemoEffect(options) {
        const transitionEffect = new GridToFullscreenEffect(
            this.app,
            this.wrapper,
            Object.assign(
                {
                    scrollContainer: window,
                    onToFullscreenStart: ({index}) => {
                    },
                    onToFullscreenFinish: ({index}) => {
                    },
                    onToGridStart: ({index}) => {
                    },
                    onToGridFinish: ({index, lastIndex}) => {
                    }
                },
                options
            )
        );

        return transitionEffect;
    }


}
