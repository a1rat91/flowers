import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {DOCUMENT} from '@angular/common';
import {LoaderService} from '../loader/loader.service';
import {TimelineMax} from 'gsap';
import {fadeInHeader} from './header.animation';
import {GSDevTools} from '../../shared/plugins/GSDevTools';
import {HeaderService} from "./header.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', './burger.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

    navigation: boolean;
    burger: boolean;
    header;
    @ViewChild('logoEl', {static: true}) private _logoEl: ElementRef;
    @ViewChild('burgerEl', {static: true}) private _burgerEl: ElementRef;
    @Output() onHeaderStateChanged = new EventEmitter<boolean>();

    get logoEl() {
        return this._logoEl.nativeElement;
    }
    get burgerEl() {
        return this._burgerEl.nativeElement;
    }

    constructor(private nav: NavigationService,
                @Inject(DOCUMENT) private document: Document,
                private loaderService: LoaderService,
                private headerService: HeaderService) {
    }

    ngOnInit() {
        this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation);
        this.nav.currentBurgerState.subscribe(burger => this.burger = burger);
        this.headerService.currentHeaderState.subscribe(header => this.header = header);
        this.fadeInHeader();
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
    }

    fadeInHeader() {
        console.log(this.headerService.getLoaderState(), 'header');

        const tl =  new TimelineMax()
            .add(fadeInHeader(this.logoEl, this.burgerEl));
        // GSDevTools.create();
    }
}
