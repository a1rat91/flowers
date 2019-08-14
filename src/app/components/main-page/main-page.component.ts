import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TweenMax, TimelineMax, Linear} from 'gsap';
// import * as gsap from 'gsap';
// import Linear = gsap.Linear;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {
  config: any;
  fullpage_api: any;

  ngOnInit() {
  }

  constructor() {

    this.config = {
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      menu: '#menu',

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      onLeave: (origin, destination, direction) => {
        // animationReset
      },
      afterLoad: (origin, destination, direction) => {
        // fadeIn
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

}
