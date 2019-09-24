import {NgModule} from '@angular/core';
import {FlowerPageComponent} from './flower-page.component';
import {DistortionSliderComponent} from '../../components/distortion-slider/distortion-slider.component';
import {SliderPaginationComponent} from '../../shared/components/slider-pagination/slider-pagination.component';
import {RouterModule} from '@angular/router';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
    declarations: [
        FlowerPageComponent,
        DistortionSliderComponent,
        SliderPaginationComponent,
    ],
    imports: [
        RouterModule.forChild([
            {
                path: ':id',
                component: FlowerPageComponent,
            }
        ]),
        LazyLoadImageModule,
    ],
    exports: [RouterModule]
})
export class FlowerPageModule {

}
