import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef, Inject,
    Input,
    OnChanges,
    OnInit, SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable, Subscribable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {DistortionSliderService} from '../../services/distortion-slider.service';
import {LoaderService} from '../../components/loader/loader.service';
import {gsap} from 'gsap';
import {fadeInMainSection} from '../main-page/main-page.animation';
import {fadeInFlowerPage} from './flower-page.animation';
import {gsapAnimationDebugTools} from '../../../assets/js/gsap-animation-debug-tools/gsap-animation-debug-tools';
import {GSDevTools} from '../../shared/plugins/GSDevTools';
const gsapWithGSDevTools = gsap.registerPlugin(GSDevTools) || gsap;
import {DOCUMENT} from '@angular/common';


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

    constructor(private route: ActivatedRoute,
                private postsService: PostsService,
                private distortionSliderService: DistortionSliderService,
                private loaderService: LoaderService,
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
            const tl =  gsap.timeline({id: 'fadeInFlowerPage'})
                .add(fadeInFlowerPage(this.titleEl, this.textEl, this.btnEl, this.paginationEl, this.footerEl));

            setTimeout(() => {
                GSDevTools.create({animation: tl, container: '#fadeInFlowerPage'});
            }, 100);
        }
    }

}
