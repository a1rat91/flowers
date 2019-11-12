import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TweenMax, TimelineMax} from 'gsap';
import * as gsap from 'gsap';
import Linear = gsap.Linear;
import {NavigationService} from '../../services/navigation.service';
import {PostsService} from '../../shared/posts.service';
import {Observable} from 'rxjs/index';
import {Post} from '../../admin/shared/interfaces';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit, AfterViewInit {

    config: any;
    fullpage_api: any;

    // TODO Отключать fullpage при открытой навигации
    navigation: boolean;
    posts$: Observable<Post[]>;

    constructor(private nav: NavigationService,
                private postsService: PostsService) {
        this.config = {
            licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
            anchors: ['firstSection', 'secondSection', 'lastSection'],
            menu: '#menu',
            afterResize: () => {
                // console.log("After resize");
            },
            onLeave: (origin, destination, direction) => {
                // animationReset
            },
            afterLoad: (origin, destination, direction) => {
                // fadeIn
            }
        };
    }

    ngOnInit() {
        this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation);

        this.posts$ = this.postsService.getAll();
    }

    ngAfterViewInit(): void {
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
}
