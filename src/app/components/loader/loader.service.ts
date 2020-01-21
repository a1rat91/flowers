import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class LoaderService {

    private loaderSource = new BehaviorSubject<string>('enable');
    currentLoaderState = this.loaderSource.asObservable();

    constructor() {
    }

    changeLoaderState(status: string) {
        this.loaderSource.next(status);
    }


}
