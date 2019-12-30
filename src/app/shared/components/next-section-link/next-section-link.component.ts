import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FadeService} from '../../../services/fade.service';
import { gsap } from 'gsap/all';
import {startNextSectionLink, fadeInNextSectionLink, fadeOutNextSectionLink, fadeOutInNextSectionLink} from './next-section-link.animation';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-next-section-link',
    templateUrl: './next-section-link.component.html',
    styleUrls: ['./next-section-link.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextSectionLinkComponent implements OnInit, OnChanges, OnDestroy {
    sectionState: string;
    @Input() receiveNextSectionLinkState;
    @ViewChild('nextSectionLink', {static: true}) private _nextSectionLink: ElementRef;
    linkText: string;

    private subscription = new Subscription();

    get nextSectionLink() {
        return this._nextSectionLink.nativeElement;
    }

    constructor(private fadeService: FadeService) {
    }

    ngOnInit() {

        // gsap.ticker.lagSmoothing(1000, 16);
        // gsap.ticker.fps(35);

        this.subscription.add(
            this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        switch (changes.receiveNextSectionLinkState.currentValue) {
            case 'fadeInMainPage':
                this.startNextSectionLink();
                break;
            case 'fadeOutMainPage':
                this.fadeOutNextSectionLink();
                break;
            case 'fadeOutCatalogSection':
                this.fadeOutNextSectionLink();
                break;
            case 'fadeInFlowerPage':
                this.fadeInNextSectionLink();
                break;
            default:
                this.fadeOutInNextSectionLink();
                break;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    startNextSectionLink() {
        gsap.timeline()
            .add(startNextSectionLink(this.nextSectionLink));
    }

    fadeInNextSectionLink() {
        gsap.timeline()
            .add(fadeInNextSectionLink(this.nextSectionLink));
    }

    fadeOutNextSectionLink() {
        gsap.timeline()
            .add(fadeOutNextSectionLink(this.nextSectionLink));
    }

    fadeOutInNextSectionLink() {
        gsap.timeline()
            .add(fadeOutInNextSectionLink(this.nextSectionLink));
    }

}
