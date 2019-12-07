import {Component, DoCheck, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DistortionSliderService} from '../../../services/distortion-slider.service';
import {SwiperComponent, SwiperConfigInterface, SwiperDirective} from 'ngx-swiper-wrapper';
import {sliderProgrees} from './distortion-slider-pagination.animation';

@Component({
    selector: 'app-distortion-slider-pagination',
    templateUrl: './distortion-slider-pagination.component.html',
    styleUrls: ['./distortion-slider-pagination.component.scss']
})
export class DistortionSliderPaginationComponent implements OnInit, DoCheck {
    @ViewChild(SwiperDirective, {static: true}) swiperView: SwiperDirective;
    @ViewChild('distortionSliderProgressbar', {static: true}) private _distortionSliderProgressbar: ElementRef;

    @Input() postImages;
    @Input() Index;
    config;
    curentProgress;
    totalProgress;
    slideIndex;
    index;
    get distortionSliderProgressbar() {
        return this._distortionSliderProgressbar.nativeElement;
    }

    constructor(private distortionSliderService: DistortionSliderService) {
    }

    ngDoCheck() {
        // this.swiperView.update();
    }

    ngOnInit() {
        this.swiperView.update();
        this.config = {
            direction: 'horizontal',
            slidesPerView: 4,
            spaceBetween: 20,
            updateOnImagesReady: true,
            pagination: {
                el: '.swiper-distortion-slider-progressbar',
                type: 'custom',
                renderCustom: (swiper, current, total) => {
                    return this.customProgressBar(current, total);
                }
            },
            navigation: {
                nextEl: '.distortion-slider-pagination__button-next',
                prevEl: '.distortion-slider-pagination__button-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 'auto',
                    spaceBetween: 15,
                }
            }
        };

        this.distortionSliderService.currentIndex.subscribe(slideIndex => this.slideIndex = slideIndex);
    }

    customProgressBar(current: number, total: number) {
        const ratio: number = (current / total) * 100;
        this.curentProgress = current;
        this.totalProgress = total;

        sliderProgrees(this.distortionSliderProgressbar, ratio);
    }

    setActiveSlide(slide) {
        this.distortionSliderService.changeActiveSlide(slide);
    }

}
