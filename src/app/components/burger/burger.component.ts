import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {

  constructor() { }

  burgerOpen = false;

  ngOnInit() {
  }

  switchBurger(){
    this.burgerOpen = !this.burgerOpen;
  }
}
