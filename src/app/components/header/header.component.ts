import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {DOCUMENT} from '@angular/common';
import {LoaderService} from '../loader/loader.service';
import { gsap } from 'gsap/all';
import {startHeader, fadeInHeader, fadeOutHeader, fadeOutInHeader} from './header.animation';
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
                private fadeService: FadeService) {
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
        this.loaderService.changeLoaderState(false);
        this.fadeService.changeSectionState('startMainPage');
    }

    startHeader() {
        const tl =  gsap.timeline()
            .add(startHeader(this.logoEl, this.burgerEl));
        // GSDevTools.create();
    }

    fadeInHeader() {
        const tl =  gsap.timeline()
            .add(fadeInHeader(this.logoEl, this.burgerEl));
        // GSDevTools.create();
    }

    fadeOutHeader() {
        const tl =  gsap.timeline()
            .add(fadeOutHeader(this.logoEl, this.burgerEl));
        // GSDevTools.create();
    }

    fadeOutInHeader() {
        const tl =  gsap.timeline()
            .add(fadeOutInHeader(this.logoEl, this.burgerEl));
        // GSDevTools.create();
    }

    // receiveHeaderState(event) {
    //     console.log(event, 'receiveHeaderState');
    // }
}
