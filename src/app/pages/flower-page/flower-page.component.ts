import {
    AfterViewInit,
    Component,
    ElementRef, Inject,
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
import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);
import {fadeInFlowerPage} from './flower-page.animation';
import {GSDevTools} from '../../shared/plugins/GSDevTools';
gsap.registerPlugin(GSDevTools);
import {DOCUMENT} from '@angular/common';
import {FadeService} from '../../services/fade.service';


@Component({
    selector: 'app-flower-page',
    templateUrl: './flower-page.component.html',
    styleUrls: ['./flower-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowerPageComponent implements OnInit, AfterViewInit {

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

    constructor(private route: ActivatedRoute,
                private postsService: PostsService,
                private distortionSliderService: DistortionSliderService,
                private loaderService: LoaderService,
                private fadeService: FadeService,
                @Inject(DOCUMENT) private document: Document) {

        this.isFirstTimeCalled = true;

        this.routeSubscription = route.queryParams.subscribe((queryParam: any) => {
            this.loader = queryParam['loader'];
            if (queryParam['loader']) {
                this.isFirstTimeCalled = false;
            }
            return this.loader;
        });
    }

    ngOnInit() {
        this.post$ = this.route.params
            .pipe(switchMap((params: Params) => {
                return this.postsService.getById(params['id']);
            }));

        this.distortionSliderService.currentIndex.subscribe(slideIndex => this.slideIndex = slideIndex);
        this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader);
        this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState);
        this.document.body.classList.remove('hidden');
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (!this.isFirstTimeCalled) {
                this.loaderService.changeLoaderState(false);
            }
        }, 0);

        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loaderService.changeLoaderState(false);
            }, 0);
        });
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
            const tl = gsap.timeline({id: 'fadeInFlowerPage'})
                .add(fadeInFlowerPage(this.titleEl, this.textEl, this.btnEl, this.paginationEl, this.footerEl));

            // GSDevTools.create({animation: tl, container: '#fadeInFlowerPage'});
        }
        this.fadeService.changeSectionState('fadeInFlowerPage');
    }

}
