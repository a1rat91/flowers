import {
    ChangeDetectionStrategy,
    Component, ElementRef,
    Input, NgZone,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {SocService} from '../../soc.service';
import {FadeService} from '../../../services/fade.service';
import {startSoc, fadeInSoc, fadeInMainSectionSoc, fadeOutInSoc, fadeOutSoc} from './soc.animation';
import {gsap} from 'gsap/all';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-soc',
    templateUrl: './soc.component.html',
    styleUrls: ['./soc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SocComponent implements OnInit, OnDestroy {
    soc;
    sectionState: string;
    @Input() receiveSocState;
    @ViewChild('socElement', {static: true}) private _socElement: ElementRef;
    get socElement() {
        return this._socElement.nativeElement;
    }

    private subscription = new Subscription();

    constructor(public socService: SocService,
                private fadeService: FadeService,
                private ngZone: NgZone) {
    }

    ngOnInit() {

        this.soc = this.socService.getSocialLinks();
        this.subscription.add(
            this.fadeService.currentSectionState.subscribe(sectionState => {
                switch (sectionState) {
                    case 'fadeInMainPage':
                        this.startSoc();
                        break;
                    case 'fadeOutMainPage':
                    case 'fadeOutCatalogSection':
                        this.fadeOutSoc();
                        break;
                    case 'fadeInCatalogSection':
                    case 'fadeInFlowerPage':
                        this.fadeInSoc();
                        break;
                    case 'fadeInMainSection':
                        this.fadeInMainSectionSoc();
                        break;
                    default:
                        this.fadeOutInSoc();
                        break;
                }

                return this.sectionState = sectionState;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    startSoc() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(startSoc(this.socElement));
            }
        );
    }

    fadeInSoc() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(fadeInSoc(this.socElement));
            }
        );
    }

    fadeInMainSectionSoc() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(fadeInMainSectionSoc(this.socElement));
            }
        );
    }

    fadeOutSoc() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(fadeOutSoc(this.socElement));
            }
        );
    }

    fadeOutInSoc() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline()
                    .add(fadeOutInSoc(this.socElement));
            }
        );
    }

}
