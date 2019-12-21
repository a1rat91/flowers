import {
    Component,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {DOCUMENT} from '@angular/common';
import {LoaderService} from '../loader/loader.service';
import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);
import {startHeader, fadeInHeader, fadeOutHeader, fadeOutInHeader} from './header.animation';
import {GSDevTools} from '../../shared/plugins/GSDevTools';
gsap.registerPlugin(GSDevTools);
import {FadeService} from '../../services/fade.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', './burger.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnChanges {

    navigation: boolean;
    burger: boolean;
    @ViewChild('logoEl', {static: true}) private _logoEl: ElementRef;
    @ViewChild('burgerEl', {static: true}) private _burgerEl: ElementRef;
    sectionState: string;
    @Input() receiveHeaderState;

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
        this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation);
        this.nav.currentBurgerState.subscribe(burger => this.burger = burger);
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);
    }

    ngOnChanges(changes: SimpleChanges): void {

        switch (changes.receiveHeaderState.currentValue) {
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
