import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {CatalogComponent} from './catalog.component';
import {CatalogItemComponent} from '../catalog-item/catalog-item.component';
import {AppRoutingModule} from '../../../app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SwiperModule,
        AppRoutingModule,
    ],
    declarations: [
        CatalogComponent,
        CatalogItemComponent,
    ],
    providers: [],
    exports: [
        CatalogComponent,
    ]
})
export class CatalogModule {
}