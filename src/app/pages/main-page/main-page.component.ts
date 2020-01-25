import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    NgZone, OnChanges,
    OnDestroy,
    OnInit, SimpleChanges,
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
    startMainSection,
    mobFadeInCatalogSection,
    mobFadeInActionsSection,
} from './main-page.animation';
import {
    fadeInCatalogSection,
    fadeOutCatalogSection
} from '../../components/catalog/catalog.animation';


import {FadeService} from '../../services/fade.service';
import {DOCUMENT} from '@angular/common';
import {CatalogComponent} from '../../components/catalog/catalog.component';
import {fadeInActions, fadeOutActions} from '../../components/actions/actions.animation';
import {NgxSmartModalService} from "ngx-smart-modal";

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
    catalogVisible = false;
    actionsVisible = false;
    isResponsive = false;

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

        this.config = {
            licenseKey: environment.fullpage.apiKey,
            anchors: ['firstSection', 'secondSection', 'lastSection'],
            menu: '#menu',
            fadingEffectKey: environment.fullpage.fadingEffectKey,
            fadingEffect: true,
            responsiveHeight: 700,
            responsiveWidth: 1024,
            afterResponsive: (isResponsive) => {
                this.isResponsive = isResponsive;
            },
            afterResize: () => {
                // console.log("After resize");
            },
            onLeave: (origin, destination, direction) => {
                // console.log(origin, destination, direction, 'onLeave');
                if (!this.isResponsive) {
                    if (origin.index === 0 && destination.index === 1) {
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
                } else {
                    if (destination.index === 1 && !this.catalogVisible) {
                        this.mobFadeInCatalogSection();
                    } else if (destination.index === 2 && !this.actionsVisible) {
                        this.mobFadeInActionsSection();
                    }
                }
            },
            afterLoad: (origin, destination, direction) => {
                if (this.isResponsive) {
                    if (destination.index === 1 && !this.catalogVisible) {
                        this.mobFadeInCatalogSection();
                    } else if (destination.index === 2 && !this.actionsVisible) {
                        this.mobFadeInActionsSection();
                    }
                }
            }
        };
    }

    ngOnInit() {

        this.cdr.detectChanges();
        this.subscription
            .add(
                this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
            ).add(
            this.navigationService.currentNavigationState.subscribe(navigation => {

                // if (this.navigation) {
                //     this.fullpage_api.setAutoScrolling(false);
                // } else {
                //     this.fullpage_api.setAutoScrolling(true);
                // }

                return this.navigation = navigation;
            }));

        this.posts$ = this.postsService.getAll();

    }

    ngAfterViewInit(): void {
        this.mainSectionActive = true;
        this.subscription.add(
            this.loaderService.currentLoaderState.subscribe(status => this.loaderStatus = status)
        );
        this.loaderService.changeLoaderState('enable');
        setTimeout(() => {
            this.startMainSection();
            this.fadeService.changeSectionState('fadeInMainPage');
        }, 500);

        this.fullpage_api.setScrollingSpeed(3000);
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
                gsap.timeline({id: 'fadeInMainSection'})
                    .add(startMainSection(this.mainTitle, this.mainBtn, this.mouse));
            }
        );

    }

    fadeInMainSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeInMainSection'})
                    .add(fadeOutCatalogSection('.catalog-title',
                        '.catalog-item__pic',
                        '.catalog-item__curtain',
                        '.catalog-item__index',
                        '.catalog-item__title',
                        '.catalog__btn',
                        '.catalog__shadow',
                        '.catalog__pagination',
                        '.catalog-item__link'))
                    .add(fadeInMainSection(this.mainSectionCurtain, this.mainTitle, this.mainBtn, this.mouse));
            }
        );
    }

    mobFadeInCatalogSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({onComplete: () => this.catalogVisible = true})
                    .add(mobFadeInCatalogSection('.is-catalog'));
            }
        );
    }

    mobFadeInActionsSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({onComplete: () => this.actionsVisible = true})
                    .add(mobFadeInActionsSection('.is-actions'));
            }
        );
    }

    fadeOutMainSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeOutMainSection'})
                    .add(fadeOutMainSection(this.mainSectionCurtain))
                    .add(fadeInCatalogSection('.catalog-title',
                        '.catalog-item__pic',
                        '.catalog-item__curtain',
                        '.catalog-item__index',
                        '.catalog-item__title',
                        '.catalog__btn',
                        '.catalog__shadow',
                        '.catalog__pagination',
                        '.catalog-item__link'));
            }
        );

    }

    fadeInCatalogSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeInCatalogSection'})
                    .add(fadeOutActions('.actions__curtain',
                        '.actions__pic',
                        '.actions__title',
                        '.actions__desc',
                        '.actions__btn',
                        '.footer'))
                    .add(fadeInCatalogSection('.catalog-title',
                        '.catalog-item__pic',
                        '.catalog-item__curtain',
                        '.catalog-item__index',
                        '.catalog-item__title',
                        '.catalog__btn',
                        '.catalog__shadow',
                        '.catalog__pagination',
                        '.catalog-item__link'));
            }
        );

    }

    fadeOutCatalogSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeOutCatalogSection'})
                    .set('.actions__curtain', {opacity: 0})
                    .add(fadeOutCatalogSection('.catalog-title',
                        '.catalog-item__pic',
                        '.catalog-item__curtain',
                        '.catalog-item__index',
                        '.catalog-item__title',
                        '.catalog__btn',
                        '.catalog__shadow',
                        '.catalog__pagination',
                        '.catalog-item__link'))
                    .add(fadeInActions('.actions__curtain',
                        '.actions__pic',
                        '.actions__title',
                        '.actions__desc',
                        '.actions__btn',
                        '.footer'));
            }
        );

    }


    isDesctop() {
        (window.innerWidth >= 1300) ? this.desctopMediaQuery = true : this.desctopMediaQuery = false;
        return this.desctopMediaQuery;
    }


}
