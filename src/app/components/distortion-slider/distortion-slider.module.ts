import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DistortionSliderPaginationComponent} from './distortion-slider-pagination/distortion-slider-pagination.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {DistortionSliderComponent} from './distortion-slider.component';
import {DistortionSliderService} from '../../services/distortion-slider.service';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    declarations: [
        DistortionSliderPaginationComponent,
        DistortionSliderComponent],
    imports: [
        CommonModule,
        SwiperModule,
        SharedModule
    ],
    exports: [
        DistortionSliderPaginationComponent,
        DistortionSliderComponent
    ],
    providers: [DistortionSliderService]
})
export class DistortionSliderModule {
}
