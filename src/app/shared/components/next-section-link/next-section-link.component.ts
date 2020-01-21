import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input, NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FadeService} from '../../../services/fade.service';
import {gsap} from 'gsap/all';
import {
    startNextSectionLink,
    fadeInNextSectionLink,
    fadeOutNextSectionLink,
    fadeOutInNextSectionLink,
    fadeInMainSectionNextSectionLink,
} from './next-section-link.animation';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-next-section-link',
    templateUrl: './next-section-link.component.html',
    styleUrls: ['./next-section-link.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextSectionLinkComponent implements OnInit, OnDestroy {
    sectionState: string;
    @Input() receiveNextSectionLinkState;
    @ViewChild('nextSectionLink', {static: true}) private _nextSectionLink: ElementRef;
    linkText: string;

    private subscription = new Subscription();

    get nextSectionLink() {
        return this._nextSectionLink.nativeElement;
    }

    constructor(private fadeService: FadeService,
                private ngZone: NgZone) {
    }

    ngOnInit() {

        this.subscription.add(
            this.fadeService.currentSectionState.subscribe(sectionState => {
                switch (sectionState) {
                    case 'fadeInMainPage':
                        this.startNextSectionLink();
                        break;
                    case 'fadeOutMainPage':
                        this.fadeOutNextSectionLink();
                        break;
                    case 'fadeOutCatalogSection':
                        this.fadeOutNextSectionLink();
                        break;
                    case 'fadeInCatalogSection':
                    case 'fadeInFlowerPage':
                        this.fadeInNextSectionLink();
                        break;
                    case 'fadeInMainSection':
                        this.fadeInMainSectionNextSectionLink();
                        break;
                    default:
                        this.fadeOutInNextSectionLink();
                        break;
                }

                return this.sectionState = sectionState;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    startNextSectionLink() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(startNextSectionLink(this.nextSectionLink));
            }
        );

    }

    fadeInNextSectionLink() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(fadeInNextSectionLink(this.nextSectionLink));
            }
        );

    }

    fadeInMainSectionNextSectionLink() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(fadeInMainSectionNextSectionLink(this.nextSectionLink));
            }
        );

    }

    fadeOutNextSectionLink() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(fadeOutNextSectionLink(this.nextSectionLink));
            }
        );

    }

    fadeOutInNextSectionLink() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(fadeOutInNextSectionLink(this.nextSectionLink));
            }
        );
    }

}
