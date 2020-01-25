import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    Input, NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {DOCUMENT} from '@angular/common';
import {LoaderService} from '../loader/loader.service';
import {gsap} from 'gsap/all';
import {startHeader, fadeInHeader, fadeInMainSectionHeader, fadeOutHeader, fadeOutInHeader} from './header.animation';
import {GSDevTools} from '../../shared/plugins/GSDevTools';

gsap.registerPlugin(GSDevTools);
import {FadeService} from '../../services/fade.service';
import {Subscription} from 'rxjs';
import {catalogNextPageTransition} from "../catalog/catalog.animation";
import {Route, Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', './burger.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

    navigation: boolean;
    burger: boolean;
    @ViewChild('logoEl', {static: true}) private _logoEl: ElementRef;
    @ViewChild('burgerEl', {static: true}) private _burgerEl: ElementRef;
    sectionState: string;
    @Input() receiveHeaderState;
    private subscription = new Subscription();

    get logoEl() {
        return this._logoEl.nativeElement;
    }

    get burgerEl() {
        return this._burgerEl.nativeElement;
    }

    constructor(private nav: NavigationService,
                @Inject(DOCUMENT) private document: Document,
                private loaderService: LoaderService,
                private fadeService: FadeService,
                private ngZone: NgZone,
                private router: Router) {
    }

    ngOnInit() {

        this.subscription
            .add(this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation))
            .add(this.nav.currentBurgerState.subscribe(burger => this.burger = burger))
            .add(this.fadeService.currentSectionState.subscribe(sectionState => {
                switch (sectionState) {
                    case 'fadeInMainPage':
                        this.startHeader();
                        break;
                    case 'fadeOutMainPage':
                    case 'fadeOutFlowerPage':
                        this.fadeOutHeader();
                        break;
                    case 'fadeInFlowerPage':
                        this.fadeInHeader();
                        break;
                    case 'fadeInMainSection':
                        this.fadeInMainSectionHeader();
                        break;
                    default:
                        this.fadeOutInHeader();
                        break;
                }
                return this.sectionState = sectionState;
            }));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    openNav() {
        this.nav.changeBurgerState(!this.burger);
        this.nav.changeNavigationState(!this.navigation);
        this.document.body.classList.add('hidden');

        if (this.navigation) {
            this.document.body.classList.remove('hidden');
        }
    }

    goToMainPage() {
        this.loaderService.changeLoaderState('disable');
        this.ngZone.runOutsideAngular(() => {
                if (document.querySelector('.flower-page')) {
                    this.fadeService.changeSectionState('fadeOutFlowerPage');
                    gsap.timeline()
                        .fromTo(['.flower-page__footer', '.flower-page__pagination', '.flower-page__btn',
                                '.flower-page__text', '.flower-page__title', '.flower-page__border'],
                            {y: 0, opacity: 1},
                            {duration: 1.5, y: 20, opacity: 0, stagger: .3, ease: 'expo'})
                        .fromTo('.distortion-slider__curtain', {x: '100%'}, {duration: 1, x: 0, ease: 'expo'}, '-=1')
                        .add(() => this.ngZone.run(() => {
                            this.router.navigate(['/']);
                        }));
                }
            }
        );
    }

    startHeader() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline()
                    .add(startHeader(this.logoEl, this.burgerEl));
            }
        );
    }

    fadeInHeader() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline()
                    .add(fadeInHeader(this.logoEl, this.burgerEl));
            }
        );

        // GSDevTools.create();
    }

    fadeInMainSectionHeader() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline()
                    .add(fadeInMainSectionHeader(this.logoEl, this.burgerEl));
            }
        );

        // GSDevTools.create();
    }

    fadeOutHeader() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline()
                    .add(fadeOutHeader(this.logoEl, this.burgerEl));
            }
        );

        // GSDevTools.create();
    }

    fadeOutInHeader() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline()
                    .add(fadeOutInHeader(this.logoEl, this.burgerEl));
            }
        );

        // GSDevTools.create();
    }

    // receiveHeaderState(event) {
    //     console.log(event, 'receiveHeaderState');
    // }
}
