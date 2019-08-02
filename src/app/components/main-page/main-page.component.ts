import { Component, OnInit } from '@angular/core';
import {TweenMax, TimelineMax, Linear} from 'gsap';
// import * as gsap from 'gsap';
// import Linear = gsap.Linear;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  config: any;
  fullpage_api: any;

  ngOnInit() {
  }

  constructor() {

    function fadeIn(el, duration, delay, x, y, opacity, scale, destination) {
      let title = document.querySelectorAll(el);
      const animationLine = new TimelineMax();﻿﻿﻿
      animationLine
        .to(title[destination], duration, {
          delay: delay,
          x: x,
          y: y,
          opacity: opacity,
          scale: scale,
          ease: Linear.easeInOut
        }, 0);
    }

    function animationReset(el, delay, x, y, opacity, scale, destination) {
      let title = document.querySelectorAll(el);
      const animationLine = new TimelineMax();﻿﻿﻿
      animationLine
        .set(title[destination], {delay: delay, x: x, y: y, opacity: opacity, scale: scale})
    }

    this.config = {
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
      menu: '#menu',

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      onLeave: (origin, destination, direction) => {
        animationReset('.some-title', 0, 0, 0, 1, 1, [destination.index]);
      },
      afterLoad: (origin, destination, direction) => {
        fadeIn('.some-title', 2, 0, 100, 0, 1, 1, [destination.index]);
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

}
