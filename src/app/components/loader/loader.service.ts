import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class LoaderService {

    private loaderSource = new Subject<boolean>();
    currentLoaderState = this.loaderSource.asObservable();

    constructor() {
    }

    changeLoaderState(loader: boolean) {
        console.log(loader, 'changeLoaderState');
        this.loaderSource.next(loader);
    }


}
