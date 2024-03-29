import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    post: Post;
    submitted = false;
    distortionSliderImg;
    distortionSliderMinImg;
    catalogImg;
    catalogTransitionImg;
    @ViewChildren('distortionSliderImgItems') private _distortionSliderImgItems: QueryList<ElementRef>;
    @ViewChildren('distortionSliderMinImgItems') private _distortionSliderMinImgItems: QueryList<ElementRef>;
    @ViewChildren('catalogImgItems') private _catalogImgItems: QueryList<ElementRef>;
    @ViewChildren('catalogTransitionImgItems') private _catalogTransitionImgItems: QueryList<ElementRef>;

    get distortionSliderImgItems() {
        return this._distortionSliderImgItems.map((element) => element.nativeElement.value);
    }

    get distortionSliderMinImgItems() {
        return this._distortionSliderMinImgItems.map((element) => element.nativeElement.value);
    }

    get catalogImgItems() {
        return this._catalogImgItems.map((element) => element.nativeElement.value);
    }

    get catalogTransitionImgItems() {
        return this._catalogTransitionImgItems.map((element) => element.nativeElement.value);
    }


    uSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postService: PostsService,
        private alert: AlertService) {
    }

    ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.postService.getById(params['id']);
            })
        ).subscribe((post: Post) => {
            this.post = post;
            this.form = new FormGroup({
                title: new FormControl(post.title, Validators.required),
                text: new FormControl(post.text, Validators.required)
            });
            this.distortionSliderImg = post.distortionSliderImg;
            this.distortionSliderMinImg = post.distortionSliderMinImg;
            this.catalogImg = post.catalogImg;
            this.catalogTransitionImg = post.catalogTransitionImg;
        });
    }

    ngOnDestroy() {
        if (this.uSub) {
            this.uSub.unsubscribe();
        }
    }

    removeImgURL(array, url) {
        array.splice(array.indexOf(url), 1);
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        console.log(this.distortionSliderImgItems);

        this.submitted = true;

        this.uSub = this.postService.update({
            ...this.post,
            title: this.form.value.title,
            text: this.form.value.text,
            distortionSliderImg: this.distortionSliderImg,
            distortionSliderMinImg: this.distortionSliderMinImg,
            catalogImg: this.catalogImg,
            catalogTransitionImg: this.catalogTransitionImg,
        }).subscribe(() => {
            this.submitted = false;
            this.alert.success('Пост был обновлен');
        });
    }
}
