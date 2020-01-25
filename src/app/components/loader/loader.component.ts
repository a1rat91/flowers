import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    NgZone,
    OnDestroy,
    OnInit
} from '@angular/core';
import {gsap} from 'gsap/all';
import {LoaderService} from './loader.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, AfterViewInit, OnDestroy {
    private subscription = new Subscription();
    public loaderStatus;

    constructor(private loaderService: LoaderService,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        this.loaderService.currentLoaderState.subscribe(status => this.loaderStatus = status);
        if (this.loaderStatus === 'enable') {
            this.fadeOut();
        }
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    fadeOut() {
        this.ngZone.runOutsideAngular(() => {
                if (document.querySelector('.loader')) {
                    gsap.timeline({
                        onComplete: () => {
                            this.loaderService.changeLoaderState('disable');
                        }
                    }).to('.loader', {duration: 1, delay: 1.5, opacity: 0, ease: 'expo'});
                }
            }
        );

    }

}
