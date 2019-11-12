import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', './header-burger.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

    navigation: boolean;
    burger: boolean;

    constructor(private nav: NavigationService,
                @Inject(DOCUMENT) private document: Document) {
    }

    ngOnInit() {
        this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation);
        this.nav.currentBurgerState.subscribe(burger => this.burger = burger);
    }

    openNav() {
        console.log(this.navigation, 'nav');
        this.nav.changeBurgerState(!this.burger);
        this.nav.changeNavigationState(!this.navigation);
        this.document.body.classList.add('hidden');

        if (this.navigation) {
            this.document.body.classList.remove('hidden');
        }
    }
}
