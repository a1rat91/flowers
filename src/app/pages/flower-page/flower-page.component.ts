import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../admin/shared/interfaces';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';


@Component({
    selector: 'app-flower-page',
    templateUrl: './flower-page.component.html',
    styleUrls: ['./flower-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowerPageComponent implements OnInit {

    post$: Observable<Post>;

    constructor(private route: ActivatedRoute,
                private postsService: PostsService) {
    }

    ngOnInit() {
        this.post$ = this.route.params
            .pipe(switchMap((params: Params) => {
                return this.postsService.getById(params['id']);
            }));

    }

    callOtherDomain() {

    }
}
