import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Page, FlowersService} from '../../services/flowers.service';
import {DistortionEffect} from '../../plugins/distortion-effect';
// import {imagesLoaded} from 'imagesLoaded';

@Component({
  selector: 'app-flower-page',
  templateUrl: './flower-page.component.html',
  styleUrls: ['./flower-page.component.scss']
})
export class FlowerPageComponent implements OnInit, AfterViewInit  {
  @Output() menuClosed: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('slider', {static: true}) slider: ElementRef;
  id: string;

  page: Page;

  constructor(private route: ActivatedRoute,
              private flowersService: FlowersService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.page = this.flowersService.getById(+params.id);
    });
  }

  ngAfterViewInit() {

    // const myAnimation = new DistortionEffect({
    //   parent: this.distort.nativeElement,
    //   intensity: 0.3,
    //   hover: false,
    //   image1: './assets/images/Img1.jpg',
    //   image2: './assets/images/Img2.jpg',
    //   image3: './assets/images/Img3.jpg',
    //   image4: './assets/images/Img4.jpg',
    //   displacementImage: './assets/images/distortion.jpg',
    //   btnNext: '.asd'
    // });

      const el = this.slider.nativeElement;
      const imgs = Array.from(el.querySelectorAll('img'));
      const myAnimation = DistortionEffect({
        parent: el,
        images: imgs
      });
  }
}
