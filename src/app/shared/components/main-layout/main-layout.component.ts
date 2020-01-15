import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
}
