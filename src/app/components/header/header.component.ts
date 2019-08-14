import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-burger.component.scss']
})
export class HeaderComponent {
  @Input() burger;
  @Output() burgerState = new EventEmitter<boolean>();

  openNav() {
    this.burger = !this.burger;
    this.burgerState.emit(this.burger);
  }

 }
