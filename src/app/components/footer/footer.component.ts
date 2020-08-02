import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {SocService} from '../../shared/soc.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

    posts;
    soc;

    constructor(private postsService: PostsService, public socService: SocService) {
    }

    ngOnInit() {
        this.posts = this.postsService.flowers;
        this.soc = this.socService.getSocialLinks();
    }
}
