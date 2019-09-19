import {AfterViewInit, Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Swiper from 'swiper';
import {DistortionSliderPlugin} from '../../shared/plugins/distortion-slider/distortion-slider-plugin';

@Component({
    selector: 'app-distortion-slider',
    templateUrl: './distortion-slider.component.html',
    styleUrls: ['./distortion-slider.component.scss']
})
export class DistortionSliderComponent implements OnInit, AfterViewInit {
    @ViewChild('distortionSlider', {static: false}) distortionSlider: ElementRef;

    constructor() {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.slider();
    }
    slider() {
        const el = this.distortionSlider.nativeElement;
        const imgs = Array.from(el.querySelectorAll('img'));
        const myAnimation = DistortionSliderPlugin({
            parent: el,
            images: imgs,
            imagesLenght: 6,
            swiper: new Swiper.default('.swiper-container', {
                effect: 'fade',
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: true
                },
                loop: true,
                loopAdditionalSlides: 0,
                pagination: {
                    el: '.slider-pagination__list',
                    clickable: true,
                    type: 'bullets',
                    renderBullet: (index, className) => {
                        return '<li style="position: relative; cursor: pointer" class="slider-pagination__item">' +
                            '<img style="display: block; width: 100%; height: auto" ' +
                            '[lazyLoad] ' +
                            'class="distortion-slider__img" ' +
                            'src="/assets/images/flower-' + (index + 1) + '.jpg"/>' +
                            '</li>';
                    }
                },
            })
        });
    }
}
