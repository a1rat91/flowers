import {AfterViewInit, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable} from 'rxjs';
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

    constructor(private route: ActivatedRoute,
                private postsService: PostsService,
                private distortionSliderService: DistortionSliderService,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.post$ = this.route.params
            .pipe(switchMap((params: Params) => {
                return this.postsService.getById(params['id']);
            }));

        this.distortionSliderService.currentIndex.subscribe(slideIndex => this.slideIndex = slideIndex);
    }

    ngAfterViewInit(): void {
        this.loaderService.currentLoaderState.subscribe(loader => this.loader = loader);
        window.addEventListener('load', () => {
            this.loaderService.changeLoaderState(false);
        });
    }

}
