import {Component} from '@angular/core';
import {PostsService} from '../../../../shared/posts.service';
import {UploadImgsService} from "../../services/uploadImgs.service";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

    isHovering: boolean;

    files: File[] = [];
    imageUrls: string [] = [];

    constructor(private uploadImgs: UploadImgsService) {
    }

    getUploadedUrls($event) {
      this.uploadImgs.addImgs($event);
    }

    toggleHover(event: boolean) {
        this.isHovering = event;
    }

    onDrop(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
    }
}
