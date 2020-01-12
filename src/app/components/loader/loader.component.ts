import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input, NgZone, OnChanges, OnDestroy,
    OnInit, SimpleChanges,
    ViewChild
} from '@angular/core';
import {gsap} from 'gsap/all';
import {LoaderService} from "./loader.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('loaderEl', {static: false}) private _loaderEl: ElementRef;
    private subscription = new Subscription();
    public loader;

    constructor(private loaderService: LoaderService,
                private ngZone: NgZone) {
        this.loader = false;
    }

    ngOnInit() {
        this.subscription.add(this.loaderService.currentLoaderState.subscribe(loader => {
            console.log(this.loader, 'qwe');
            if (loader) {
                this.fadeOut();
            }
            return this.loader = loader;
        }));
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.loaderService.changeLoaderState(true);
        }, 500);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    get loaderEl() {
        return this._loaderEl.nativeElement;
    }

    fadeOut() {
        this.ngZone.runOutsideAngular(() => {
                gsap.to(this.loaderEl, {duration: 1, opacity: 0, ease: 'expo'});
            }
        );

    }

}
