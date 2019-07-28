import {Component, OnInit} from '@angular/core';
import {TweenMax, TimelineMax, CSSRulePlugin} from 'gsap';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
                let title = document.querySelectorAll('.some-title'),
                    timeLine = new TimelineMax();

                timeLine
                    .set(title[destination.index], {x: 0, y: 0})
            },
            afterLoad: (origin, destination, direction) => {
                const animationLine = new TimelineMax();﻿﻿﻿
                let title = document.querySelectorAll('.some-title');
                animationLine
                    .to(title[destination.index], 2, {delay: 0, x: 100, y: 0}, 0);
            }
        };
    }

    getRef(fullPageRef) {
        this.fullpage_api = fullPageRef;
    }
}
