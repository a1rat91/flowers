import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subscription} from 'rxjs/index';
import {environment} from '../../../environments/environment';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {NavigationService} from '../../services/navigation.service';
import {LoaderService} from '../../components/loader/loader.service';
import {gsap} from 'gsap';

// TODO Удалить GSDevTools
import {GSDevTools} from '../../shared/plugins/GSDevTools';

gsap.registerPlugin(GSDevTools);

import {
    fadeInMainSection,
    fadeOutMainSection,
    startMainSection
} from './main-page.animation';
import {
    fadeInCatalogSection,
    fadeOutCatalogSection
} from '../../components/catalog/catalog.animation';


import {FadeService} from '../../services/fade.service';
import {DOCUMENT} from '@angular/common';
import {CatalogComponent} from '../../components/catalog/catalog.component';
import {fadeInActions, fadeOutActions} from '../../components/actions/actions.animation';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {

    config: any;
    fullpage_api: any;
    navigation: boolean;
    posts$: Observable<Post[]>;
    @ViewChild('mainTitle', {static: true}) private _mainTitle: ElementRef;
    @ViewChild('mainSectionCurtain', {static: true}) private _mainSectionCurtain: ElementRef;
    @ViewChild('mainBtn', {static: true}) private _mainBtn: ElementRef;
    @ViewChild('mouse', {static: true}) private _mouse: ElementRef;
    @ViewChild(CatalogComponent, {static: false}) catalogComponent: CatalogComponent;
    loaderStatus: string;
    desctopMediaQuery: boolean;
    mainSectionActive: boolean;
    sectionState: string;

    private subscription = new Subscription();

    constructor(private navigationService: NavigationService,
                private postsService: PostsService,
                private loaderService: LoaderService,
                private fadeService: FadeService,
                private cdr: ChangeDetectorRef,
                private ngZone: NgZone,
                @Inject(DOCUMENT) private document: Document) {

        this.isDesctop();

        window.addEventListener('resize', () => this.isDesctop());

        if (this.isDesctop()) {
            this.config = {
                licenseKey: environment.fullpage.apiKey,
                anchors: ['firstSection', 'secondSection', 'lastSection'],
                menu: '#menu',
                fadingEffectKey: environment.fullpage.fadingEffectKey,
                fadingEffect: true,
                responsiveHeight: 800,
                responsiveWidth: 992,
                afterResponsive: (isResponsive) => {
                    // console.info(isResponsive, 'Fullpage responsive mode');
                },
                afterResize: () => {
                    // console.log("After resize");
                },
                onLeave: (origin, destination, direction) => {
                    // console.log(origin, destination, direction, 'onLeave');
                    if (origin.index === 0 && destination.index === 1) {
                        // Если не первая секция, не отыгрываем анимацию
                        this.fadeService.changeSectionState('fadeOutMainSection');
                        this.fadeOutMainSection();
                        this.mainSectionActive = false;
                    } else if (origin.index === 1 && destination.index === 0) {
                        this.fadeService.changeSectionState('fadeInMainSection');
                        this.fadeInMainSection();
                        this.mainSectionActive = true;
                    } else if (origin.index === 1 && direction === 'down') {
                        this.fadeService.changeSectionState('fadeOutCatalogSection');
                        this.fadeOutCatalogSection();
                    } else if (origin.index === 2 && direction === 'up') {
                        this.fadeService.changeSectionState('fadeInCatalogSection');
                        this.fadeInCatalogSection();
                    }
                },
                afterLoad: (origin, destination, direction) => {
                    // console.group('afterLoad', [origin, destination, direction]);
                }
            };
        } else {
            this.config = {
                licenseKey: environment.fullpage.apiKey,
                anchors: ['firstSection', 'secondSection', 'lastSection'],
                menu: '#menu',
                responsiveHeight: 800,
                responsiveWidth: 992,
                afterResponsive: (isResponsive) => {
                    // console.info(isResponsive, 'Fullpage responsive mode');
                },
                afterResize: () => {
                    // console.log("After resize");
                },
                onLeave: (origin, destination, direction) => {
                },
                afterLoad: (origin, destination, direction) => {
                    // console.group('afterLoad', [origin, destination, direction]);
                }
            };
        }
    }

    ngOnInit() {

        this.cdr.detectChanges();
        this.subscription
            .add(
                this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
            ).add(
            this.navigationService.currentNavigationState.subscribe(navigation => {
                // this.fullpage_api.setAutoScrolling(true);
                if (!this.navigation) {
                    // this.fullpage_api.setAutoScrolling(false);
                }

                return this.navigation = navigation;
            }));

        this.posts$ = this.postsService.getAll();

    }

    ngAfterViewInit(): void {
        this.mainSectionActive = true;
        this.subscription.add(
            this.loaderService.currentLoaderState.subscribe(status => this.loaderStatus = status)
        );
        console.log(this.loaderStatus, 'this.loaderStatus 123');
        this.loaderService.changeLoaderState('enable');
        setTimeout(() => {
            this.startMainSection();
            this.fadeService.changeSectionState('fadeInMainPage');
        }, 500);
        // this.fadeService.changeSectionState('fadeInMainPage');

        this.fullpage_api.setScrollingSpeed(3000);

        if (!this.isDesctop()) {
            // this.fullpage_api.destroy('all');
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getRef(fullPageRef) {
        this.fullpage_api = fullPageRef;
    }

    get mainTitle() {
        return this._mainTitle.nativeElement;
    }

    get mainBtn() {
        return this._mainBtn.nativeElement;
    }

    get mouse() {
        return this._mouse.nativeElement;
    }

    get mainSectionCurtain() {
        return this._mainSectionCurtain.nativeElement;
    }

    startMainSection() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline({id: 'fadeInMainSection'})
                    .add(startMainSection(this.mainTitle, this.mainBtn, this.mouse));
            }
        );

    }

    fadeInMainSection() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline({id: 'fadeInMainSection'})
                    .add(fadeOutCatalogSection(document.querySelector('.catalog-title'),
                        document.querySelectorAll('.catalog-item__pic'),
                        document.querySelectorAll('.catalog-item__curtain'),
                        document.querySelectorAll('.catalog-item__index'),
                        document.querySelectorAll('.catalog-item__title'),
                        document.querySelectorAll('.catalog__btn'),
                        document.querySelector('.catalog__shadow'),
                        document.querySelector('.catalog__pagination'),
                        document.querySelectorAll('.catalog-item__link')))
                    .add(fadeInMainSection(this.mainSectionCurtain, this.mainTitle, this.mainBtn, this.mouse));

                // GSDevTools.create({animation: tl});
            }
        );
    }

    fadeOutMainSection() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline({id: 'fadeOutMainSection'})
                    .add(fadeOutMainSection(this.mainSectionCurtain))
                    .add(fadeInCatalogSection(document.querySelector('.catalog-title'),
                        document.querySelectorAll('.catalog-item__pic'),
                        document.querySelectorAll('.catalog-item__curtain'),
                        document.querySelectorAll('.catalog-item__index'),
                        document.querySelectorAll('.catalog-item__title'),
                        document.querySelectorAll('.catalog__btn'),
                        document.querySelector('.catalog__shadow'),
                        document.querySelector('.catalog__pagination'),
                        document.querySelectorAll('.catalog-item__link')));
            }
        );

    }

    fadeInCatalogSection() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline({id: 'fadeInCatalogSection'})
                    .add(fadeOutActions(document.querySelector('.actions__curtain'),
                        document.querySelector('.actions__pic'),
                        document.querySelector('.actions__title'),
                        document.querySelector('.actions__desc'),
                        document.querySelector('.actions__btn'),
                        document.querySelector('.footer')))
                    .add(fadeInCatalogSection(document.querySelector('.catalog-title'),
                        document.querySelectorAll('.catalog-item__pic'),
                        document.querySelectorAll('.catalog-item__curtain'),
                        document.querySelectorAll('.catalog-item__index'),
                        document.querySelectorAll('.catalog-item__title'),
                        document.querySelectorAll('.catalog__btn'),
                        document.querySelector('.catalog__shadow'),
                        document.querySelector('.catalog__pagination'),
                        document.querySelectorAll('.catalog-item__link')));
            }
        );

    }

    fadeOutCatalogSection() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline({id: 'fadeOutCatalogSection'})
                    .set(document.querySelector('.actions__curtain'), {opacity: 0})
                    .add(fadeOutCatalogSection(document.querySelector('.catalog-title'),
                        document.querySelectorAll('.catalog-item__pic'),
                        document.querySelectorAll('.catalog-item__curtain'),
                        document.querySelectorAll('.catalog-item__index'),
                        document.querySelectorAll('.catalog-item__title'),
                        document.querySelectorAll('.catalog__btn'),
                        document.querySelector('.catalog__shadow'),
                        document.querySelector('.catalog__pagination'),
                        document.querySelectorAll('.catalog-item__link')))
                    .add(fadeInActions(document.querySelector('.actions__curtain'),
                        document.querySelector('.actions__pic'),
                        document.querySelector('.actions__title'),
                        document.querySelector('.actions__desc'),
                        document.querySelector('.actions__btn'),
                        document.querySelector('.footer')));
            }
        );

    }


    isDesctop() {
        (window.innerWidth >= 992) ? this.desctopMediaQuery = true : this.desctopMediaQuery = false;
        return this.desctopMediaQuery;
    }


}
