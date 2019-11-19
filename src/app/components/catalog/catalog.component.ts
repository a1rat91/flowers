import {Component, ElementRef, Input, NgZone, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import { TimelineMax } from 'gsap';
import {
    catalogNextPageTransition
} from './catalog.animation';
import {gsapAnimationDebugTools} from '../../../assets/js/gsap-animation-debug-tools/gsap-animation-debug-tools';

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
    @ViewChildren('catalogItems') private _catalogItems: QueryList<ElementRef>;
    @ViewChild('catalog', {static: true}) private _catalog: ElementRef;
    @ViewChild('catalogTitle', {static: true}) private _catalogTitle: ElementRef;
    lightBoxActive;

    constructor(private router: Router, private ngZone: NgZone) {
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

    get catalog() {
        return this._catalog.nativeElement;
    }
    get catalogItems() {
        return this._catalogItems.map((element) => element.nativeElement);
    }
    get catalogTitle() {
        return this._catalogTitle.nativeElement;
    }

    nextPage(id, event) {
        // console.log(event);
        const catalogWrap = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        const catalogEl = event.target;
        const catalogElWidth = window.innerWidth / 2;
        const catalogElHeight = window.innerHeight;
        const catalogElImg = catalogEl.querySelector('.catalog-item__img');
        this.catalog.classList.add('go-to-next-page');
        catalogWrap.classList.add('hide-items');
        catalogEl.classList.add('active');


        const tl = new TimelineMax()
            .add(catalogNextPageTransition(this.catalogTitle, catalogEl, catalogElImg, catalogEl.getBoundingClientRect().left, catalogElWidth, catalogElHeight))
            .add(() => this.ngZone.run(() => {
                // this.router.navigate([`/post/${ id }`]);
            }));

        gsapAnimationDebugTools(tl, 0.1, 0.1);
    }

    lightBoxActivated(event) {
        return this.lightBoxActive = event;
    }

}
