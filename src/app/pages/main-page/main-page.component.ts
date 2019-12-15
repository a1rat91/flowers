import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs/index';

import {environment} from '../../../environments/environment';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {NavigationService} from '../../services/navigation.service';
import {LoaderService} from '../../components/loader/loader.service';

import {EaselPlugin, gsap} from 'gsap/all';

gsap.registerPlugin(EaselPlugin);
//TODO Удалить GSDevTools
import {GSDevTools} from '../../shared/plugins/GSDevTools';

const gsapWithGSDevTools = gsap.registerPlugin(GSDevTools);

import {
    fadeInMainSection,
    fadeOutMainSection
} from './main-page.animation';

import {FadeService} from '../../services/fade.service';
import set = Reflect.set;

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit, AfterViewInit {

    config: any;
    fullpage_api: any;
    navigation: boolean;
    posts$: Observable<Post[]>;
    @ViewChild('mainTitle', {static: true}) private _mainTitle: ElementRef;
    @ViewChild('mainBtn', {static: true}) private _mainBtn: ElementRef;
    @ViewChild('mouse', {static: true}) private _mouse: ElementRef;
    loader: boolean;
    desctopMediaQuery;
    sectionState: boolean;

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
            responsiveHeight: 800,
            responsiveWidth: 992,
            afterResponsive: (isResponsive) => {
                // console.info(isResponsive, 'Fullpage responsive mode');
            },
            afterResize: () => {
                // console.log("After resize");
            },
            onLeave: (origin, destination, direction) => {
                console.group('animationReset', [origin, destination, direction]);

                if (origin.index === 0 && direction === 'down') {
                    // Если не первая секция, не отыгрываем анимацию
                    this.fadeOutMainSection();
                } else if (origin.index === 1 && direction === 'up') {
                    this.fadeInMainSection();
                }
            },
            afterLoad: (origin, destination, direction) => {
                // console.group('afterLoad', [origin, destination, direction]);
            }
        };
    }

    ngOnInit() {
        this.navigationService.currentNavigationState.subscribe(navigation => this.navigation = navigation);
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);

        this.posts$ = this.postsService.getAll();

    }

    ngAfterViewInit(): void {
        this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader);
        window.addEventListener('load', () => {
            this.loaderService.changeLoaderState(false);
            this.fadeInMainSection();
        });
        this.navigationService.currentNavigationState.subscribe(navigation => {
            // this.fullpage_api.setAutoScrolling(true);
            if (!this.navigation) {
                // this.fullpage_api.setAutoScrolling(false);
            }

            return this.navigation = navigation;
        });

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
        this.fadeService.changeSectionState(false);
        const tl = gsap.timeline({id: 'fadeInMainSection'})
            .add(fadeInMainSection(this.mainTitle, this.mainBtn, this.mouse));
        GSDevTools.create({animation: tl, container: '#fadeInMainSection'});
    }

    fadeOutMainSection() {
        this.fadeService.changeSectionState(true);
        const tl = gsap.timeline({id: 'fadeOutMainSection'})
            .add(fadeOutMainSection(this.mainTitle, this.mainBtn, this.mouse));
        // GSDevTools.create({animation: tl, container: '#fadeOutMainSection'});
    }

    isDesctop() {
        (window.innerWidth >= 992) ? this.desctopMediaQuery = true : this.desctopMediaQuery = false;
    }


}
