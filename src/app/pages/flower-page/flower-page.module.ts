import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {DistortionSliderModule} from '../../components/distortion-slider/distortion-slider.module';

import {SharedModule} from '../../shared/shared.module';
import {FlowerPageComponent} from './flower-page.component';
import {SliderPaginationComponent} from '../../shared/components/slider-pagination/slider-pagination.component';

@NgModule({
    declarations: [
        FlowerPageComponent,
        SliderPaginationComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
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
