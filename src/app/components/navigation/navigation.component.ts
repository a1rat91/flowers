import {Component, EventEmitter, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FlowersService} from '../../flowers.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  @Output() navClosed: EventEmitter<any> = new EventEmitter<any>();
  constructor(private flowersService: FlowersService) {}

  public flowers = [];
  public closeMenu = false;

  ngOnInit() {
    this.flowers = this.flowersService.flowers;
  }

  // closeMenuEvent() {
  //   this.closeMenu = !this.navClosed;
  //   console.log('navigation component', this.navClosed);
  // }


}
