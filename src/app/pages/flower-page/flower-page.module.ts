import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {
    DistortionSliderModule,
} from '../../components/distortion-slider/distortion-slider.module';
import {Angular2PhotoswipeModule} from 'angular2_photoswipe';

import {SharedModule} from '../../shared/shared.module';
import {FlowerPageComponent} from './flower-page.component';
import {SliderPaginationComponent} from '../../shared/components/slider-pagination/slider-pagination.component';
import {DistortionSliderService} from '../../services/distortion-slider.service';

@NgModule({
    declarations: [
        FlowerPageComponent,
        SliderPaginationComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        Angular2PhotoswipeModule,
        LazyLoadImageModule,
        DistortionSliderModule,
        RouterModule.forChild([
            {
                path: ':id',
                component: FlowerPageComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class FlowerPageModule {
}
