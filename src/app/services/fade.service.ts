import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FadeService {

    private sectionState = new BehaviorSubject<boolean>(false);
    currentSectionState = this.sectionState.asObservable();

    constructor() {
    }

    changeSectionState(sectionState: boolean) {
        this.sectionState.next(sectionState);
    }

}
