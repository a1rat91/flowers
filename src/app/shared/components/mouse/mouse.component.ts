import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MouseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
