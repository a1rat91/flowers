import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '../../components/loader/loader.service';
import {FadeService} from '../../services/fade.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  loader: boolean;
  sectionState;

  constructor(private loaderService: LoaderService,
              private fadeService: FadeService) {
    this.subscription.add(
        this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader)
    ).add(
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToMainPage() {
    this.loaderService.changeLoaderState(false);
    this.fadeService.changeSectionState('startMainPage');
  }

}
