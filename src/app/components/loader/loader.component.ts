import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LoaderService} from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @ViewChild('loaderEl', {static: true}) private loaderEl: ElementRef;
  @Output() loaderEvent = new EventEmitter<boolean>();
  loader;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader);
  }

}
