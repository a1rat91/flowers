import {
    AfterViewInit, ChangeDetectionStrategy,
    Component,
    ElementRef, Inject, NgZone, OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {DistortionSliderService} from '../../services/distortion-slider.service';
import {LoaderService} from '../../components/loader/loader.service';
import {gsap} from 'gsap/all';
import {GSDevTools} from '../../shared/plugins/GSDevTools';

gsap.registerPlugin(GSDevTools);
import {DOCUMENT} from '@angular/common';
import {FadeService} from '../../services/fade.service';


@Component({
    selector: 'app-flower-page',
    templateUrl: './flower-page.component.html',
    styleUrls: ['./flower-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowerPageComponent implements OnInit, AfterViewInit, OnDestroy {

    post$: Observable<Post>;
    slideIndex;
    loader: boolean;
    @ViewChild('titleEl', {static: true}) private _titleEl: ElementRef;
    @ViewChild('textEl', {static: true}) private _textEl: ElementRef;
    @ViewChild('btnEl', {static: true}) private _btnEl: ElementRef;
    @ViewChild('paginationEl', {static: true}) private _paginationEl: ElementRef;
    @ViewChild('footerEl', {static: true}) private _footerEl: ElementRef;
    isFirstTimeCalled: boolean;
    private routeSubscription: Subscription;
    sectionState;

    private subscription = new Subscription();

    constructor(private route: ActivatedRoute,
                private postsService: PostsService,
                private distortionSliderService: DistortionSliderService,
                private loaderService: LoaderService,
                private fadeService: FadeService,
                @Inject(DOCUMENT) private document: Document,
                private ngZone: NgZone) {

        this.subscription.add(
            this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader)
        ).add(
            this.routeSubscription = route.queryParams.subscribe((queryParam: any) => {
                // if (queryParam['loader'] === 'false') {
                //     this.loaderService.changeLoaderState(true);
                // } else {
                //     this.loaderService.changeLoaderState(false);
                // }
            })
        );
    }

    ngOnInit() {
        this.post$ = this.route.params
            .pipe(switchMap((params: Params) => {
                return this.postsService.getById(params['id']);
            }));

        this.subscription.add(
            this.distortionSliderService.currentIndex.subscribe(slideIndex => this.slideIndex = slideIndex)
        );
        this.subscription.add(
            this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
        );
        this.document.body.classList.remove('hidden');
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.loaderService.changeLoaderState(true);
        }, 500);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    get titleEl() {
        return this._titleEl.nativeElement;
    }

    get textEl() {
        return this._textEl.nativeElement;
    }

    get btnEl() {
        return this._btnEl.nativeElement;
    }

    get paginationEl() {
        return this._paginationEl.nativeElement;
    }

    get footerEl() {
        return this._footerEl.nativeElement;
    }

    fadeInFlowerPage(event) {
        if (event === 'loaded') {
            this.ngZone.runOutsideAngular(() => {
                    const tl = gsap.timeline({id: 'fadeInFlowerPage'})
                        .to([this.titleEl, this.textEl, this.btnEl, this.paginationEl, this.footerEl],
                            {duration: 2, delay: 1, y: 0, opacity: 1, stagger: .3, ease: 'expo'});

                    // GSDevTools.create({animation: tl, container: '#fadeInFlowerPage'});
                }
            );
        }
        this.fadeService.changeSectionState('fadeInFlowerPage');
    }

}
