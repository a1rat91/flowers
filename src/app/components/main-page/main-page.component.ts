import {Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {TweenMax, TimelineMax} from 'gsap';
import * as gsap from 'gsap';
import Linear = gsap.Linear;
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {

  config: any;
  fullpage_api: any;

  // TODO Отключать fullpage при открытой навигации
  navigation: boolean;

  constructor(private nav: NavigationService) {
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
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }
}
