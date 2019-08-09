import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-burger.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() burgerStateChanged: EventEmitter<any> = new EventEmitter<any>();

  burgerOpen = true;
  @Input() isMenuOpen: boolean;

  ngOnInit() {
  }

  openNav() {
    this.burgerOpen = !this.burgerOpen;
    this.burgerStateChanged.emit(!this.burgerOpen);
  }

 }
