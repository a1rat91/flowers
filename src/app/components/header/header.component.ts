import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-burger.component.scss']
})
export class HeaderComponent implements OnInit {

  navigation: boolean;
  burger: boolean;

  constructor(private nav: NavService) {
  }

  ngOnInit() {
    this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation);
    this.nav.currentBurgerState.subscribe(burger => this.burger = burger);
  }

  openNav() {
    this.nav.changeBurgerState(!this.burger);
    this.nav.changeNavigationState(!this.navigation);
  }
 }
