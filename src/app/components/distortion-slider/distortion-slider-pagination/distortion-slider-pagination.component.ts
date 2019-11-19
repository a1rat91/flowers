import {Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {DistortionSliderService} from '../../../services/distortion-slider.service';
import {SwiperComponent, SwiperConfigInterface, SwiperDirective} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-distortion-slider-pagination',
  templateUrl: './distortion-slider-pagination.component.html',
  styleUrls: ['./distortion-slider-pagination.component.scss']
})
export class DistortionSliderPaginationComponent implements OnInit, DoCheck {
  @ViewChild(SwiperDirective, {static: true}) swiperView: SwiperDirective;

  @Input() postImages;
  @Input() Index;
    config: SwiperConfigInterface;
    curentProgress;
    totalProgress;
    slideIndex;
    index

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
              el: '.swiper-distortion-slider-pagination-progressbar',
              type: 'progressbar',
          },
          navigation: {
              nextEl: '.distortion-slider-pagination__button-next',
              prevEl: '.distortion-slider-pagination__button-prev',
          }
      };

      this.distortionSliderService.currentIndex.subscribe(slideIndex => this.slideIndex = slideIndex);
  }

    setActiveSlide(slide) {
        this.distortionSliderService.changeActiveSlide(slide);
    }

}
