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
                private ngZone: NgZone) {
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
    }

    startHeader() {
        this.ngZone.runOutsideAngular(() => {
                const tl = gsap.timeline()
                    .add(startHeader(this.logoEl, this.burgerEl));
            }
        );

        // GSDevTools.create();
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
