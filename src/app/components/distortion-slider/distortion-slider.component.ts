import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DistortionEffect} from "../../plugins/distortion-effect";

@Component({
  selector: 'app-distortion-slider',
  templateUrl: './distortion-slider.component.html',
  styleUrls: ['./distortion-slider.component.scss']
})
export class DistortionSliderComponent implements OnInit, AfterViewInit {

  @ViewChild('distortionSlider', {static: true}) distortionSlider: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    const el = this.distortionSlider.nativeElement;
    const imgs = Array.from(el.querySelectorAll('img'));
    const myAnimation = DistortionEffect({
      parent: el,
      images: imgs
    });
  }

}
