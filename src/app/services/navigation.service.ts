import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PostsService} from '../shared/posts.service';

@Injectable()
export class NavigationService {
  private navigationSource = new BehaviorSubject<boolean>(false);
  private burgerSource = new BehaviorSubject<boolean>(false);
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
