import {
    AfterViewInit,
    Component, ElementRef,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges, ViewChild,
    ViewChildren
} from '@angular/core';
import {SocService} from '../../soc.service';
import {FadeService} from '../../../services/fade.service';
import {startSoc, fadeInSoc, fadeOutInSoc, fadeOutSoc} from './soc.animation';
import {gsap} from 'gsap/all';

@Component({
    selector: 'app-soc',
    templateUrl: './soc.component.html',
    styleUrls: ['./soc.component.scss']
})

export class SocComponent implements OnInit, OnChanges {
    soc;
    sectionState: string;
    @Input() receiveSocState;
    @ViewChild('socItems', {static: true}) private _socItems: ElementRef;
    get socItems() {
        return this._socItems.nativeElement;
    }

    constructor(public socService: SocService,
                private fadeService: FadeService) {
    }

    ngOnInit() {
        this.soc = this.socService.getSocialLinks();
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);
    }

    ngOnChanges(changes: SimpleChanges): void {

        switch (changes.receiveSocState.currentValue) {
            case 'fadeInMainPage':
                this.startSoc();
                break;
            case 'fadeOutMainPage':
                this.fadeOutSoc();
                break;
            case 'fadeInFlowerPage':
                this.fadeInSoc();
                break;
            default:
                this.fadeOutInSoc();
                break;
        }
    }

    startSoc() {
        const tl =  gsap.timeline()
            .add(startSoc(this.socItems));
        // GSDevTools.create();
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

    fadeOutInSoc() {
        const tl =  gsap.timeline()
            .add(fadeOutInSoc(this.socItems));
        // GSDevTools.create();
    }

}
