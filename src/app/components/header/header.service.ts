import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeaderService {
    private headerSource = new BehaviorSubject<boolean>(true);
    currentHeaderState = this.headerSource.asObservable();

    constructor() {
    }

    changeLoaderState(header: boolean) {
        console.log(header, '========');
        this.headerSource.next(header);
    }

    getLoaderState() {
        return this.headerSource;
    }
}
