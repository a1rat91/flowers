import {AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable, Subscribable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {DistortionSliderService} from '../../services/distortion-slider.service';
import {LoaderService} from '../../components/loader/loader.service';


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
    isFirstTimeCalled: boolean;
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private postsService: PostsService,
                private distortionSliderService: DistortionSliderService,
                private loaderService: LoaderService) {

        this.isFirstTimeCalled = true;

        this.routeSubscription = route.queryParams.subscribe((queryParam: any) => {
            this.loader = queryParam['loader'];
            if (queryParam['loader']) {
                this.isFirstTimeCalled = false;
            }
            console.log(this.loader, '1111111111111111');
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
    }

    ngAfterViewInit(): void {
        console.log(this.isFirstTimeCalled, 'this.isFirstTimeCalled');
        console.log(this.routeSubscription, 'this.routeSubscription');
        if (!this.isFirstTimeCalled) {
            this.loaderService.changeLoaderState(false);
        }

        window.addEventListener('load', () => {
            console.log('load')
            this.loaderService.changeLoaderState(false);
        });
    }

}
