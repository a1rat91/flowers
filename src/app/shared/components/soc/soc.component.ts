import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SocService} from '../../soc.service';

@Component({
    selector: 'app-soc',
    templateUrl: './soc.component.html',
    styleUrls: ['./soc.component.scss']
})

export class SocComponent implements OnInit {

    constructor(public socService: SocService) {
    }

    soc;

    ngOnInit() {
        this.soc = this.socService.getSocialLinks();
    }

}
