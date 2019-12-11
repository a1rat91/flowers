import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SocService} from '../../soc.service';
import {FadeService} from '../../../services/fade.service';

@Component({
    selector: 'app-soc',
    templateUrl: './soc.component.html',
    styleUrls: ['./soc.component.scss']
})

export class SocComponent implements OnInit {
    soc;
    sectionState: boolean;
    constructor(public socService: SocService,
                private fadeService: FadeService) {
    }

    ngOnInit() {
        this.soc = this.socService.getSocialLinks();
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);
    }

}
