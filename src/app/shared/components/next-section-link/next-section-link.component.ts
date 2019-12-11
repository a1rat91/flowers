import {Component, OnInit} from '@angular/core';
import {FadeService} from '../../../services/fade.service';

@Component({
    selector: 'app-next-section-link',
    templateUrl: './next-section-link.component.html',
    styleUrls: ['./next-section-link.component.scss']
})
export class NextSectionLinkComponent implements OnInit {
    sectionState: boolean;
    constructor(private fadeService: FadeService) {
    }

    ngOnInit() {
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);
    }

}
