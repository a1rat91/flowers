import {NgModule} from '@angular/core';
import {FlowerPageComponent} from './flower-page.component';
import {DistortionSliderComponent} from '../distortion-slider/distortion-slider.component';
import {SliderPaginationComponent} from '../slider-pagination/slider-pagination.component';

@NgModule({
    declarations: [
        FlowerPageComponent,
        DistortionSliderComponent,
        SliderPaginationComponent,
    ],
    imports: []
})
export class FlowerPageModule {

}
