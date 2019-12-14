import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FadeService} from '../../../services/fade.service';
import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);
import {fadeInNextSectionLink, fadeOutNextSectionLink} from './next-section-link.animation';

@Component({
    selector: 'app-next-section-link',
    templateUrl: './next-section-link.component.html',
    styleUrls: ['./next-section-link.component.scss']
})
export class NextSectionLinkComponent implements OnInit, OnChanges {
    sectionState: boolean;
    @Input() receiveNextSectionLinkState;
    @ViewChild('nextSectionLink', {static: true}) private _nextSectionLink: ElementRef;

    get nextSectionLink() {
        return this._nextSectionLink.nativeElement;
    }

    constructor(private fadeService: FadeService) {
    }

    ngOnInit() {
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.receiveNextSectionLinkState) {
            this.fadeOutNextSectionLink();
        } else {
            this.fadeInNextSectionLink();
        }
    }

    fadeInNextSectionLink() {
        const tl =  gsap.timeline()
            .add(fadeInNextSectionLink(this.nextSectionLink));
        // GSDevTools.create();
    }

    fadeOutNextSectionLink() {
        const tl =  gsap.timeline()
            .add(fadeOutNextSectionLink(this.nextSectionLink));
        // GSDevTools.create();
    }

}
