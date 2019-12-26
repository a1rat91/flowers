import {
    AfterViewInit,
    Component,
    ElementRef, OnDestroy,
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

import {gsap} from 'gsap/all';

gsap.ticker.lagSmoothing(1000, 16);
//TODO Удалить GSDevTools
import {GSDevTools} from '../../shared/plugins/GSDevTools';

gsap.registerPlugin(GSDevTools);

import {
    fadeInMainSection,
    fadeOutMainSection
} from './main-page.animation';
import {
    fadeInCatalogSection,
    fadeOutCatalogSection
} from '../../components/catalog/catalog.animation';


import {FadeService} from '../../services/fade.service';
import set = Reflect.set;

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {

    config: any;
    fullpage_api: any;
    navigation: boolean;
    posts$: Observable<Post[]>;
    @ViewChild('mainTitle', {static: true}) private _mainTitle: ElementRef;
    @ViewChild('mainBtn', {static: true}) private _mainBtn: ElementRef;
    @ViewChild('mouse', {static: true}) private _mouse: ElementRef;
    loader: boolean;
    desctopMediaQuery;
    sectionState: string;

    private subscription = new Subscription();

    constructor(private navigationService: NavigationService,
                private postsService: PostsService,
                private loaderService: LoaderService,
                private fadeService: FadeService) {

        this.isDesctop();

        window.addEventListener('resize', () => this.isDesctop());

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
                if (origin.index === 0 && direction === 'down') {
                    // Если не первая секция, не отыгрываем анимацию
                    this.fadeService.changeSectionState('fadeOutMainSection');
                    this.fadeOutMainSection();
                } else if (origin.index === 1 && direction === 'up') {
                    this.fadeService.changeSectionState('fadeInMainSection');
                    this.fadeInMainSection();
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
    }

    ngOnInit() {
        this.subscription
            .add(
                this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
            ).add(
                this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader)
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

        window.addEventListener('DOMContentLoaded', () => {
            this.loaderService.changeLoaderState(false);
            this.fadeService.changeSectionState('fadeInMainPage');
            this.fadeInMainSection();
        });
        this.fadeService.changeSectionState('fadeInMainPage');

        this.fullpage_api.setScrollingSpeed(1200);

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

    fadeInMainSection() {
        const tl = gsap.timeline({id: 'fadeInMainSection'})
            .add(fadeInMainSection(this.mainTitle, this.mainBtn, this.mouse));
    }

    fadeOutMainSection() {
        const tl = gsap.timeline({id: 'fadeOutMainSection'})
            .add(fadeOutMainSection(this.mainTitle, this.mainBtn, this.mouse));
    }

    fadeInCatalogSection() {
        const tl = gsap.timeline({id: 'fadeInCatalogSection'})
            .add(fadeInCatalogSection());
    }

    fadeOutCatalogSection() {
        const tl = gsap.timeline({id: 'fadeOutCatalogSection'})
            .add(fadeOutCatalogSection());
    }


    isDesctop() {
        (window.innerWidth >= 992) ? this.desctopMediaQuery = true : this.desctopMediaQuery = false;
    }


}
