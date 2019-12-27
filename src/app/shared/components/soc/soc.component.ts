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

export class SocComponent implements OnInit, OnChanges, OnDestroy {
    soc;
    sectionState: string;
    @Input() receiveSocState;
    @ViewChild('socItems', {static: true}) private _socItems: ElementRef;
    get socItems() {
        return this._socItems.nativeElement;
    }
    private subscription = new Subscription();

    constructor(public socService: SocService,
                private fadeService: FadeService) {
    }

    ngOnInit() {

        gsap.ticker.lagSmoothing(1000, 16);
        gsap.ticker.fps(35);

        this.soc = this.socService.getSocialLinks();
        this.subscription.add(
            this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
        );
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
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
