import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FadeService} from '../../../services/fade.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  sectionState: string;
  constructor(private fadeService: FadeService) { }

  ngOnInit() {
    this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);
  }

}
