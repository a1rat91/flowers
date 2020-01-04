import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import { gsap } from 'gsap/all';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, OnChanges {
  @ViewChild('loaderEl', {static: true}) private _loaderEl: ElementRef;
  @Input() loader;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loader.currentValue) {
      this.fadeOut();
    }
    this.loader = false;
  }

  get loaderEl() {
    return this._loaderEl.nativeElement;
  }

  fadeOut() {
    gsap.to(this.loaderEl, {duration: 1, opacity: 0, ease: 'expo'});
  }

}
