import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Post} from '../../admin/shared/interfaces';
import {Observable} from 'rxjs';
import {PostsService} from "../../shared/posts.service";
import {SocService} from "../../shared/soc.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styles: [
        `
        .footer {
            position: relative;
            z-index: 200;
        }
      `
    ],
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
