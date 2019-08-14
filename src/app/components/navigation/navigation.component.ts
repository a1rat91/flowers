import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FlowersService} from '../../flowers.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  @Input() navState: boolean;
  @Input() burger;
  @Output() burgerState = new EventEmitter<boolean>();
  constructor(private flowersService: FlowersService) {}

  public flowers = [];
  public closeMenu = false;

  ngOnInit() {
    this.flowers = this.flowersService.flowers;
  }

  closeMenuEvent(){
    this.navState = !this.navState;
    this.burgerState.emit(this.burger);
  }
}
