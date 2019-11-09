import {Component, Input, OnInit} from '@angular/core';
import {DistortionSliderService} from '../../../services/distortion-slider.service';

@Component({
  selector: 'app-distortion-slider-pagination',
  templateUrl: './distortion-slider-pagination.component.html',
  styleUrls: ['./distortion-slider-pagination.component.scss']
})
export class DistortionSliderPaginationComponent implements OnInit {

  @Input() postImages;
    config;
    curentProgress;
    totalProgress;
    slideIndex;

  constructor(private distortionSliderService: DistortionSliderService) { }

  ngOnInit() {
      this.config = {
          direction: 'horizontal',
          slidesPerView: 4,
          spaceBetween: 20,
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
