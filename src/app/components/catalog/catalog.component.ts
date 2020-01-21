import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    NgZone, OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren, ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';

import {gsap} from 'gsap/all';

import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

import {catalogNextPageTransition, sliderProgrees} from './catalog.animation';
import {DOCUMENT} from '@angular/common';
import {GridToFullscreenEffect as GridToFullscreenEffect} from '../../../assets/js/GridToFullscreenEffect.js';
import {LoaderService} from '../loader/loader.service';
import {FadeService} from '../../services/fade.service';
import {Subscription} from 'rxjs';

declare var imagesLoaded: any;

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss', './catalog-item.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit, AfterViewInit, OnDestroy {
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
    @ViewChildren('catalogItemBtns') private _catalogItemBtns: QueryList<ElementRef>;
    @ViewChild('catalogTransition', {static: true}) private _catalogTransition: ElementRef;
    @ViewChild('catalogTransitionCurtain', {static: true}) private _catalogTransitionCurtain: ElementRef;
    @ViewChild('catalogProgressbar', {static: true}) private _catalogProgressbar: ElementRef;
    @ViewChild('catalogShadow', {static: true}) private _catalogShadow: ElementRef;
    @ViewChildren('catalogPic') private _catalogPic: QueryList<ElementRef>;
    @ViewChildren('catalogBtns') private _catalogBtns: QueryList<ElementRef>;
    @Input() postImage;
    currentIndex;
    sectionState: string;
    isPaginationDisable: boolean;
    loaderStatus: string;

    private subscription = new Subscription();

    constructor(private router: Router,
                private ngZone: NgZone,
                @Inject(DOCUMENT) private document: Document,
                private loaderService: LoaderService,
                private fadeService: FadeService,
                private cdr: ChangeDetectorRef) {
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

    get catalogItemBtns() {
        return this._catalogItemBtns.map((element) => element.nativeElement);
    }

    get catalogTransition() {
        return this._catalogTransition.nativeElement;
    }

    get catalogTransitionCurtain() {
        return this._catalogTransitionCurtain.nativeElement;
    }

    get catalogProgressbar() {
        return this._catalogProgressbar.nativeElement;
    }

    get catalogPic() {
        return this._catalogPic.map((element) => element.nativeElement);
    }

    get catalogShadow() {
        return this._catalogShadow.nativeElement;
    }

    get catalogBtns() {
        return this._catalogBtns.map((element) => element.nativeElement);
    }

    ngOnInit() {
        this.subscription.add(
            this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
        ).add(
            this.loaderService.currentLoaderState.subscribe(status => this.loaderStatus = status)
        );

        this.config = {
            direction: 'horizontal',
            slidesPerView: 4,
            spaceBetween: 50,
            pagination: {
                el: '.swiper-catalog-progressbar',
                type: 'custom',
                renderCustom: (swiper, current, total) => {
                    return this.customProgressBar(current, total);
                }
            },
            navigation: {
                nextEl: '.catalog__button-next',
                prevEl: '.catalog__button-prev',
            },
            breakpoints: {
                1400: {
                    slidesPerView: 3,
                    spaceBetween: 28,
                },
                992: {
                    slidesPerView: 2,
                    spaceBetween: 28,
                },
                540: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                }
            }
        };
    }

    ngAfterViewInit() {

        const itemsWrapper = this.wrappers;
        const thumbs = this.thumbsItems;
        const fullviewItems = this.fullviewItems;
        const transitionEffectDuration = 1.2;
        this.ngZone.runOutsideAngular(() => {
                const transitionEffect = this.createTransitionEffect({
                    activation: {type: 'mouse'},
                    timing: {
                        duration: transitionEffectDuration
                    },
                    transformation: {
                        type: 'simplex',
                        props: {
                            seed: '1000',
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
                    seed: 80
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
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    customProgressBar(current: number, total: number) {
        const ratio: number = (current / total) * 100;

        this.curentProgress = current;
        this.totalProgress = total;
        this.cdr.detectChanges();
        sliderProgrees(this.catalogProgressbar, ratio);
    }

    nextPage(id) {
        this.fadeService.changeSectionState('fadeOutMainPage');
        this.loaderService.changeLoaderState('disable');
        this.ngZone.runOutsideAngular(() => {
                let tl = gsap.timeline()
                    .to(window, {duration: 0.5, scrollTo: '#js-catalog', ease: 'Expo.inOut'})
                    .add(catalogNextPageTransition(this.catalogTitle, this.catalogPic, this.catalogTransitionCurtain))
                    .add(() => this.ngZone.run(() => {
                        this.router.navigate([`/post/${id}`], {queryParams: {status: 'disable'}});
                    }));
            }
        );
    }

    createTransitionEffect(options) {
        const transitionEffect = new GridToFullscreenEffect(
            this.catalogTransition,
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
