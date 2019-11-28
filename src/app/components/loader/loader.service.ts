import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LoaderService {

    private loaderSource = new BehaviorSubject<boolean>(true);
    currentLoaderState = this.loaderSource.asObservable();

    constructor() {
    }

    changeLoaderState(loader: boolean) {
        console.log(loader, 'loader');
        this.loaderSource.next(loader);
    }


}
