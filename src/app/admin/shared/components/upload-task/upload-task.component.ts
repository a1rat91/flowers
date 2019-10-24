import {Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {PostsService} from '../../../../shared/posts.service';

@Component({
    selector: 'app-upload-task',
    templateUrl: './upload-task.component.html',
    styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

    task: AngularFireUploadTask;

    percentage: Observable<number>;
    snapshot: Observable<any>;
    downloadURL;
    downloadUrls: string[];

    @Input() file: File;
    @Output() imageUploadEvent = new EventEmitter<string>();

    constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
        this.downloadUrls = [];
    }

    ngOnInit() {
        this.startUpload();
    }

    startUpload() {

        // The storage path
        const path = `test/${Date.now()}_${this.file.name}`;

        // Reference to storage bucket
        const ref = this.storage.ref(path);

        // The main task
        this.task = this.storage.upload(path, this.file);

        // Progress monitoring
        this.percentage = this.task.percentageChanges();

        this.snapshot = this.task.snapshotChanges().pipe(
            tap(console.log),
            // The file's download URL
            finalize( async() =>  {
                this.downloadURL = await ref.getDownloadURL().toPromise();
                this.db.collection('files').add({ downloadURL: this.downloadURL, path });
                this.imageUploadEvent.emit(this.downloadURL);
            })
        );
    }

    isActive(snapshot) {
        return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
    }

}