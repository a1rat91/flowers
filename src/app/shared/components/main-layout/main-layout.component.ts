import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FadeService} from '../../../services/fade.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  sectionState: string;
  private subscription = new Subscription();

  constructor(private fadeService: FadeService) { }

  ngOnInit() {
    this.subscription.add(
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
