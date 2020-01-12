import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../shared/interfaces';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';
import {UploadImgsService} from '../shared/services/uploadImgs.service';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePageComponent implements OnInit {

    form: FormGroup;
    constructor(
        private postsService: PostsService,
        private alert: AlertService,
        private uploadImgsService: UploadImgsService,
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            text: new FormControl(null, Validators.required)
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        const post: Post = {
            title: this.form.value.title,
            text: this.form.value.text,
            distortionSliderImg: this.uploadImgsService.getImgs('distortionSliderImg'),
            distortionSliderMinImg: this.uploadImgsService.getImgs('distortionSliderMinImg'),
            catalogImg: this.uploadImgsService.getImgs('catalogImg'),
            catalogTransitionImg: this.uploadImgsService.getImgs('catalogTransitionImg')
        };

        this.postsService.create(post).subscribe(() => {
          this.uploadImgsService.clearImgs();
          this.form.reset();
          this.alert.success('Пост был создан');
        });
    }

}
