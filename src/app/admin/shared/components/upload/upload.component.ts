import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UploadImgsService} from '../../services/uploadImgs.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent {

    isHovering: boolean;
    @Input() prefix;
    @Input() descr;
    files: File[] = [];

    constructor(private uploadImgs: UploadImgsService) {
    }

    getUploadedUrls($event) {
      this.uploadImgs.addImgs($event, this.prefix);
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
