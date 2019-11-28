import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {TweenMax, TimelineMax} from 'gsap';
import {NavigationService} from '../../services/navigation.service';
import {PostsService} from '../../shared/posts.service';
import {Observable} from 'rxjs/index';
import {Post} from '../../admin/shared/interfaces';

// TODO: For animation debug
import {gsapAnimationDebugTools as gsapAnimationDebugTools} from '../../../assets/js/gsap-animation-debug-tools/gsap-animation-debug-tools';

import {
    fadeInMainSection,
    fadeOutMainSection
} from './main-page.animation';
import {LoaderService} from '../../components/loader/loader.service';

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

    constructor(private nav: NavigationService,
                private postsService: PostsService,
                private loaderService: LoaderService) {
        this.config = {
            licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
            anchors: ['firstSection', 'secondSection', 'lastSection'],
            menu: '#menu',
            afterResize: () => {
                // console.log("After resize");
            },
            onLeave: (origin, destination, direction) => {
                // animationReset
                // console.log('onLeave', origin);
                // console.log('onLeave', destination);
                // console.log('onLeave', direction);

                if (destination.index !== 0) {
                    // Если не первая секция, не отыгрываем анимацию
                    this.fadeOutMainSection();
                }
            },
            afterLoad: (origin, destination, direction) => {
                // fadeIn
                // console.log('afterLoad', origin);
                // console.log('afterLoad', destination);
                // console.log('afterLoad', direction);

                if (destination.index !== 0) {
                    // Если не первая секция, не отыгрываем анимацию
                    this.fadeInMainSection();
                }
            }
        };
    }

    ngOnInit() {
        this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation);

        this.posts$ = this.postsService.getAll();

        this.fadeInMainSection();


    }

    ngAfterViewInit(): void {
        this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader);
        window.addEventListener('load', () => {
            this.loaderService.changeLoaderState(false);
        });
        this.nav.currentNavigationState.subscribe(navigation => {
            this.fullpage_api.setAutoScrolling(true);
            if (!this.navigation) {
                this.fullpage_api.setAutoScrolling(false);
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
        const tl =  new TimelineMax()
            .add(fadeInMainSection(this.mainTitle, this.mainBtn, this.mouse));

        // gsapAnimationDebugTools(tl, 0.1, 0.1);
    }

    fadeOutMainSection() {
        const tl =  new TimelineMax()
            .add(fadeOutMainSection(this.mainTitle, this.mainBtn, this.mouse));
    }


}
