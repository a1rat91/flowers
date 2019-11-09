import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {ActionsComponent} from './actions.component';
import {AppRoutingModule} from '../../../app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SwiperModule,
        AppRoutingModule,
    ],
    declarations: [
        ActionsComponent,
    ],
    providers: [],
    exports: [
        ActionsComponent,
    ]
})
export class ActionsModule {
}