import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Post} from '../../admin/shared/interfaces';
import {Observable} from 'rxjs';
import {PostsService} from '../../shared/posts.service';
import {SocService} from '../../shared/soc.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    posts$: Observable<Post[]>;
    soc;

    constructor(private postsService: PostsService, public socService: SocService) {
    }

    ngOnInit() {
        this.posts$ = this.postsService.getAll();
        this.soc = this.socService.getSocialLinks();
    }
}
