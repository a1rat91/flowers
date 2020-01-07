import {
    AfterViewChecked,
    AfterViewInit, ChangeDetectionStrategy,
    Component,
    DoCheck,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable, Subscription} from 'rxjs';
import { gsap } from 'gsap/all';
import {
    fadeInNavigation,
    fadeOutNavigation
} from './navigation.animation';
import {LoaderService} from '../loader/loader.service';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('navigation', {static: true}) private _navigationSections: ElementRef;
    @ViewChildren('navMenuItems') private _navMenuItems: QueryList<ElementRef>;
    @Input() index;
    public navigation: boolean;
    public burger: boolean;
    public flowers = [];
    public posts$: Observable<Post[]>;
    private subscription = new Subscription();

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

        // gsap.ticker.lagSmoothing(1000, 16);
        // gsap.ticker.fps(35);

        this.subscription.add(
            this.nav.currentNavigationState.subscribe(navigation => {
                if (!this.navigation) {
                    this.fadeOutNav();
                } else {
                    this.fadeInNav();
                }
                return this.navigation = navigation;
            })
        ).add(
            this.nav.currentBurgerState.subscribe(burger => this.burger = burger)
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    closeNav() {
        this.nav.changeBurgerState(!this.burger);
        this.nav.changeNavigationState(!this.navigation);
        if (this.loaderService.currentLoaderState) {
            // this.loaderService.changeLoaderState(false);
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
