import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
    @Input() posts;
    config;
    curentProgress;
    totalProgress;

    constructor() {

    }

    ngOnInit() {
        this.config = {
            direction: 'horizontal',
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-actions-progressbar',
                type: 'progressbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        };
    }

}
