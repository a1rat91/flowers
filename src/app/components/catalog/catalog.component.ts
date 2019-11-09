import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
    @Input() posts;
    config;
    curentProgress;
    totalProgress;

    constructor() {

    }

    ngOnInit() {
        this.config = {
            direction: 'horizontal',
            slidesPerView: 4,
            spaceBetween: 60,
            pagination: {
                el: '.swiper-catalog-progressbar',
                type: 'progressbar',
                renderCustom: (swiper, current, total) => {
                    return this.customProgressBar(current, total);
                }
            },
            navigation: {
                nextEl: '.catalog__button-next',
                prevEl: '.catalog__button-prev',
            }
        };
    }

    customProgressBar(current: number, total: number): string {
        const ratio: number = current / total;

        this.curentProgress = current;
        this.totalProgress = total;

        const progressBarStyle =
            `style="transform: translate3d(0px, 0px, 0px) scaleX(${ ratio }) scaleY(1); transition: 500ms;"`;
        const progressBar =
            `<span class='swiper-pagination-progressbar-fill' ${progressBarStyle}></span>`;

        let progressBarContainer =
            `<div class="swiper-pagination-progressbar" style="height: 4px; bottom: -1px; width: 100%; background-color: #fff;">`;
        progressBarContainer += progressBar;
        progressBarContainer += '</span></div>';

        return progressBarContainer;
    }

}
