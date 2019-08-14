import {AfterViewInit, Component} from '@angular/core';
import * as Swiper from 'swiper/dist/js/swiper';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss', './swiper-custom.component.scss']
})
export class SwiperComponent implements AfterViewInit {
  mySwiper: Swiper;
  slides = [
    'https://via.placeholder.com/300x200/FF5733/ffffff',
    'https://via.placeholder.com/300x200/C70039/ffffff',
    'https://via.placeholder.com/300x200/900C3F/ffffff'
  ];

  constructor() { }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 10000,
        }
    });
  }
}
