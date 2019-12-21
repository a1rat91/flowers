import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FadeService {

    private sectionState = new Subject<string>();
    currentSectionState = this.sectionState.asObservable();

    constructor() {
    }

    changeSectionState(sectionState: string) {
        this.sectionState.next(sectionState);
    }

}
