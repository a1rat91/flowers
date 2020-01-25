import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss', './form.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
