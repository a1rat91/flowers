import {
    ChangeDetectionStrategy,
    Component, ElementRef,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    SimpleChanges, ViewChild
} from '@angular/core';
import {SocService} from '../../soc.service';
import {FadeService} from '../../../services/fade.service';
import {startSoc, fadeInSoc, fadeOutInSoc, fadeOutSoc} from './soc.animation';
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
                private fadeService: FadeService) {
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
                        this.fadeOutSoc();
                        break;
                    case 'fadeInFlowerPage':
                        this.fadeInSoc();
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
        const tl =  gsap.timeline()
            .add(startSoc(this.socElement));
        // GSDevTools.create();
    }

    fadeInSoc() {
        const tl =  gsap.timeline()
            .add(fadeInSoc(this.socElement));
        // GSDevTools.create();
    }

    fadeOutSoc() {
        const tl =  gsap.timeline()
            .add(fadeOutSoc(this.socElement));
        // GSDevTools.create();
    }

    fadeOutInSoc() {
        const tl =  gsap.timeline()
            .add(fadeOutInSoc(this.socElement));
        // GSDevTools.create();
    }

}
