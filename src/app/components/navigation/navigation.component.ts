import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FlowersService} from '../../services/flowers.service';
import {NavService} from '../../services/nav.service';

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

  constructor(
    private flowersService: FlowersService,
    private nav: NavService
  ) {}

  ngOnInit() {
    this.flowers = this.flowersService.flowers;
    this.nav.currentNavigationState.subscribe(navigation => this.navigation = navigation);
    this.nav.currentBurgerState.subscribe(burger => this.burger = burger);
  }

  closeNav() {
    this.nav.changeBurgerState(!this.burger);
    this.nav.changeNavigationState(!this.navigation);
  }
}
