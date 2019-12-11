import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FullpageMediaQueryService {
    fullpageWindowHeight;

    constructor() {
    }

    windowHeightMath(windowWidth) {
        if (windowWidth < 768 && windowWidth >= 480) {
            this.fullpageWindowHeight = 650;
        } else if (windowWidth < 480) {
            this.fullpageWindowHeight = 600;
        } else {
            this.fullpageWindowHeight = 800;
        }

        return this.fullpageWindowHeight;
    }


}
