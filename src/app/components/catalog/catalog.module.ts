import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {CatalogComponent} from './catalog.component';
import {AppRoutingModule} from '../../app-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SwiperModule,
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        CatalogComponent
    ],
    providers: [],
    exports: [
        CatalogComponent
    ]
})
export class CatalogModule {
}
