import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable} from "rxjs";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
    navigation: boolean;
    burger: boolean;
    public flowers = [];
    posts$: Observable<Post[]>;

    constructor(
        private postsService: PostsService,
        private nav: NavigationService) {
    }

    ngOnInit() {
        this.posts$ = this.postsService.getAll();
        this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation);
        this.nav.currentBurgerState.subscribe(burger => this.burger = burger);
    }

    closeNav() {
        this.nav.changeBurgerState(!this.burger);
        this.nav.changeNavigationState(!this.navigation);
    }
}
