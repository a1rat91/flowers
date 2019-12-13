import {
    AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable} from 'rxjs';
import { gsap } from 'gsap';
import {
    fadeInNavigation,
    fadeOutNavigation
} from './navigation.animation';

// TODO: For animation debug
import {gsapAnimationDebugTools as gsapAnimationDebugTools} from '../../../assets/js/gsap-animation-debug-tools/gsap-animation-debug-tools';
import {LoaderService} from '../loader/loader.service';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit, AfterViewInit, DoCheck {

    @ViewChild('navigation', {static: true}) private _navigationSections: ElementRef;
    @ViewChildren('navMenuItems') private _navMenuItems: QueryList<ElementRef>;
    @Input() index;
    public navigation: boolean;
    public burger: boolean;
    public flowers = [];
    public posts$: Observable<Post[]>;

    constructor(
        private postsService: PostsService,
        private nav: NavigationService,
        private loaderService: LoaderService) {
        this.burger = false;
        this.navigation = false;
    }

    ngOnInit() {
        this.posts$ = this.postsService.getAll();
    }

    ngAfterViewInit() {
        this.nav.currentNavigationState.subscribe(navigation => {
            if (!this.navigation) {
                this.fadeOutNav();
            } else {
                this.fadeInNav();
            }
            return this.navigation = navigation;
        });
        this.nav.currentBurgerState.subscribe(burger => this.burger = burger);
    }

    ngDoCheck() {
        // TODO для дебага, потом удалить
    }

    closeNav() {
        this.nav.changeBurgerState(!this.burger);
        this.nav.changeNavigationState(!this.navigation);
        if (this.loaderService.currentLoaderState) {
            this.loaderService.changeLoaderState(false);
        }
    }

    get navigationEl() {
        return this._navigationSections.nativeElement;
    }
    get navigationMenu() {
        return this._navMenuItems.map((element) => element.nativeElement);
    }

    fadeInNav() {
        const tl =  gsap.timeline().add(fadeInNavigation(this.navigationEl, this.navigationMenu));


        // gsAnimationTools(tl, 0.1, 0.1);
    }

    fadeOutNav() {
        // const tl = new TimelineMax({delay: 0.5})
        //     .add(fadeOutNavigation(this.navigationEl, this.navigationMenu));
        const tl = gsap.timeline({delay: 0.5})
            .add(fadeOutNavigation(this.navigationEl, this.navigationMenu));

        // gsapAnimationDebugTools(tl, 0.1, 0.1);
    }
}
