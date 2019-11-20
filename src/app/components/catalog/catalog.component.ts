import {
    AfterViewInit,
    Component, DoCheck,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { TimelineMax } from 'gsap';
import { catalogNextPageTransition } from './catalog.animation';
import {gsapAnimationDebugTools} from '../../../assets/js/gsap-animation-debug-tools/gsap-animation-debug-tools';
import {Power1} from 'gsap';
import {DOCUMENT} from '@angular/common';
import {GridToFullscreenEffect as GridToFullscreenEffect} from '../../../assets/js/GridToFullscreenEffect.js';
declare var imagesLoaded: any;

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss', './catalog-item.scss']
})
export class CatalogComponent implements OnInit, AfterViewInit, DoCheck {
    @Input() posts;
    config;
    curentProgress;
    totalProgress;
    @ViewChildren('catalogItems') private _catalogItems: QueryList<ElementRef>;
    @ViewChild('catalog', {static: true}) private _catalog: ElementRef;
    @ViewChild('catalogTitle', {static: true}) private _catalogTitle: ElementRef;
    @ViewChildren('thumbsItems') private _thumbsItems: QueryList<ElementRef>;
    @ViewChildren('fullviewItems') private _fullviewItems: QueryList<ElementRef>;
    @ViewChildren('wrapper') private _wrapper: QueryList<ElementRef>;
    @ViewChild('app', {static: true}) private _app: ElementRef;
    @Input() postImage;
    currentIndex;

    constructor(private router: Router, private ngZone: NgZone, @Inject(DOCUMENT) private document: Document) {
    }

    get catalog() {
        return this._catalog.nativeElement;
    }
    get catalogItems() {
        return this._catalogItems.map((element) => element.nativeElement);
    }
    get catalogTitle() {
        return this._catalogTitle.nativeElement;
    }
    get thumbsItems() {
        return this._thumbsItems.map((element) => element.nativeElement);
    }
    get fullviewItems() {
        return this._fullviewItems.map((element) => element.nativeElement);
    }
    get wrappers() {
        return this._wrapper.map((element) => element.nativeElement);
    }
    get app() {
        return this._app.nativeElement;
    }

    ngOnInit() {
        this.config = {
            direction: 'horizontal',
            slidesPerView: 4,
            spaceBetween: 60,
            pagination: {
                el: '.swiper-catalog-progressbar',
                type: 'progressbar',
                renderCustom: (swiper, current, total) => {
                    return this.customProgressBar(current, total);
                }
            },
            navigation: {
                nextEl: '.catalog__button-next',
                prevEl: '.catalog__button-prev',
            }
        };
    }

    ngAfterViewInit() {
        const itemsWrapper = this.wrappers;
        const thumbs = this.thumbsItems;
        const fullviewItems = this.fullviewItems;
        const transitionEffectDuration = 1.2;
        const transitionEffect = this.createDemoEffect({
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
                transitionEffect.uniforms.uSeed.value = index * 10;
                toggleFullview();
            },
            seed: 800,
            easings: {
                toFullscreen: Power1.easeOut,
                toGrid: Power1.easeInOut
            }
        });
        transitionEffect.init();
        const toggleFullview = () => {
            fullviewItems[this.currentIndex].classList.add('fullview__item--current');
        };
        imagesLoaded(document.querySelectorAll('.grid__item-img'), instance => {
            // Make Images sets for the transition effect
            const images = [];
            for (let i = 0, imageSet = {}; i < instance.elements.length; i++) {
                const image = {
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
            transitionEffect.createTextures(images);
        });
    }

    ngDoCheck() {
    }

    customProgressBar(current: number, total: number): string {
        const ratio: number = current / total;

        this.curentProgress = current;
        this.totalProgress = total;

        const progressBarStyle =
            `style="transform: translate3d(0px, 0px, 0px) scaleX(${ ratio }) scaleY(1); transition: 500ms;"`;
        const progressBar =
            `<span class='swiper-pagination-progressbar-fill' ${progressBarStyle}></span>`;

        let progressBarContainer =
            `<div class="swiper-pagination-progressbar" style="height: 4px; bottom: -1px; width: 100%; background-color: #fff;">`;
        progressBarContainer += progressBar;
        progressBarContainer += '</span></div>';

        return progressBarContainer;
    }

    nextPage(id, event) {
        const catalogWrap = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        const catalogEl = event.target;

        const tl = new TimelineMax()
            .add(catalogNextPageTransition(this.catalogTitle, catalogEl))
            .add(() => this.ngZone.run(() => {
                // this.router.navigate([`/post/${ id }`]);
            }));

        gsapAnimationDebugTools(tl, 0.1, 0.1);
    }

    createDemoEffect(options) {
        const transitionEffect = new GridToFullscreenEffect(
            this.app,
            this.wrappers,
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
