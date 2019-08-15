import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class NavService {
  private navigationSource = new BehaviorSubject<boolean>(false);
  private burgerSource = new BehaviorSubject<boolean>(false);
  currentNavigationState = this.navigationSource.asObservable();
  currentBurgerState = this.burgerSource.asObservable();

  changeNavigationState(navigation: boolean) {
    this.navigationSource.next(navigation);
  }
  changeBurgerState(burger: boolean) {
    this.burgerSource.next(burger);
  }
}
