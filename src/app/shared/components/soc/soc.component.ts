import {
    AfterViewInit,
    Component, ElementRef,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges,
    ViewChildren
} from '@angular/core';
import {SocService} from '../../soc.service';
import {FadeService} from '../../../services/fade.service';
import {fadeInSoc, fadeOutSoc} from './soc.animation';
import {gsap} from "gsap/gsap-core";

@Component({
    selector: 'app-soc',
    templateUrl: './soc.component.html',
    styleUrls: ['./soc.component.scss']
})

export class SocComponent implements OnInit, OnChanges {
    soc;
    sectionState: boolean;
    @Input() receiveSocState;
    @ViewChildren('socItems') private _socItems: QueryList<ElementRef>;

    get socItems() {
        return this._socItems.map((element) => element.nativeElement);
    }

    constructor(public socService: SocService,
                private fadeService: FadeService) {
    }

    ngOnInit() {
        this.soc = this.socService.getSocialLinks();
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.receiveSocState) {
            this.fadeOutSoc();
        } else {
            this.fadeInSoc();
        }
    }

    fadeInSoc() {
        const tl =  gsap.timeline()
            .add(fadeInSoc(this.socItems));
        // GSDevTools.create();
    }

    fadeOutSoc() {
        const tl =  gsap.timeline()
            .add(fadeOutSoc(this.socItems));
        // GSDevTools.create();
    }

}
