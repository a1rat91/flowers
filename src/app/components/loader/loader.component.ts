import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {LoaderService} from './loader.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  @ViewChild('loaderEl', {static: true}) private loaderEl: ElementRef;
  @Output() loaderEvent = new EventEmitter<boolean>();
  loader;

  private subscription = new Subscription();

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription.add(
        this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
