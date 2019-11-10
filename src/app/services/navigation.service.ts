import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PostsService} from '../shared/posts.service';

@Injectable()
export class NavigationService {
  private navigationSource = new BehaviorSubject<boolean>(true);
  private burgerSource = new BehaviorSubject<boolean>(true);
  currentNavigationState = this.navigationSource.asObservable();
  currentBurgerState = this.burgerSource.asObservable();
  posts: PostsService;

  changeNavigationState(navigation: boolean) {
    this.navigationSource.next(navigation);
  }
  changeBurgerState(burger: boolean) {
    this.burgerSource.next(burger);
  }
}
