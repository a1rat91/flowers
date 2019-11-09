import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { Image } from 'angular2_photoswipe';
import {DistortionSliderService} from "../../services/distortion-slider.service";


@Component({
    selector: 'app-flower-page',
    templateUrl: './flower-page.component.html',
    styleUrls: ['./flower-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowerPageComponent implements OnInit {

    post$: Observable<Post>;
    slideIndex;

    constructor(private route: ActivatedRoute,
                private postsService: PostsService,
                private distortionSliderService: DistortionSliderService) {
    }

    ngOnInit() {
        this.post$ = this.route.params
            .pipe(switchMap((params: Params) => {
                return this.postsService.getById(params['id']);
            }));

        this.distortionSliderService.currentIndex.subscribe(slideIndex => this.slideIndex = slideIndex);
    }

}
