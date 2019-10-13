import {Injectable, Inject} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';

import * as firebase from 'firebase/app';
import {Upload} from '../interfaces';

@Injectable({providedIn: 'root'})
export class UploadService {
    private basePath = '/test';
    private uploadTask: firebase.storage.UploadTask;
    public uploadUrl: string;
    uploads: AngularFireList<any>;
    cacheMetadata = {
        cacheControl: 'public,max-age=2592000'
    };

    constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) public firebaseApp: firebase.app.App) { }

    // Метод загрузки файла в бинарном виде
    pushUpload(upload: Upload) {
        const storageRef = this.firebaseApp.storage().ref();
        this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file, this.cacheMetadata);

        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // загрузка в процессе
                snapshot.ref.getDownloadURL().then((url) => {
                    // do something with url here
                    this.uploadUrl = url;
                })
                upload.progress = (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100
            },
            (error) => {
                // ошибка при загрузке
                console.warn(error);
            },
            () => {
                // загрузка успешна

                upload.url = this.uploadUrl;
                console.log(this.uploadUrl);
                upload.name = upload.file.name;
                this.saveFileData(upload);
            }
        );

        return this.uploadTask;
    }

    // Метод загрузки файла в base64
    pushUploadBase(base: string, name: string) {
        const storageRef = this.firebaseApp.storage().ref();
        const upload: any = {};
        this.uploadTask = storageRef.child(`${this.basePath}/${name}`).putString(base, 'data_url', this.cacheMetadata);

        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // загрузка в процессе
                snapshot.ref.getDownloadURL().then((url) => {
                    // do something with url here
                    this.uploadUrl = url;
                });
                upload.progress = (this.uploadTask.snapshot.bytesTransferred / this.uploadTask.snapshot.totalBytes) * 100
            },
            (error) => {
                // ошибка при загрузке
                console.warn(error);
            },
            () => {
                // загрузка успешна
                upload.url = this.uploadUrl;
                upload.name = name;
                this.saveFileData(upload);
            }
        );

        return this.uploadTask;
    }

    // Метод записи данных о загрузке в базу firebase
    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
    }

    // Метод удаления загруженного файла
    deleteUpload(upload: Upload) {
        this.deleteFileData(upload.$key)
            .then(() => {
                this.deleteFileStorage(upload.name);
            })
            .catch(error => console.log(error));
    }
    // Удаление данных о загрузке из базы firebase
    private deleteFileData(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    // Удаление файла из хранилища firebase
    private deleteFileStorage(name: string) {
        const storageRef = this.firebaseApp.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete();
    }
}