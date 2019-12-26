import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-logo',
  templateUrl: './navigation-logo.component.html',
  styleUrls: ['./navigation-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationLogoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
