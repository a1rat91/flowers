import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/index";

@Injectable()
export class DistortionSliderService {
    private activeSlideIndex = new BehaviorSubject<any>(0);
    currentIndex = this.activeSlideIndex.asObservable();

    changeActiveSlide(slide: number) {
        this.activeSlideIndex.next(slide);
    }
}