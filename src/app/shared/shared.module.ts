import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {LoaderModule} from '../components/loader/loader.module';
import {LazyLoadImageModule, scrollPreset} from 'ng-lazyload-image';
import {PopupComponent} from '../components/popup/popup.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot(),
        LoaderModule,
        LazyLoadImageModule.forRoot({
            preset: scrollPreset
        }),
        NgxSmartModalModule.forRoot()
    ],
    exports: [
        HttpClientModule,
        QuillModule,
        LoaderModule,
        LazyLoadImageModule,
        PopupComponent,
        NgxSmartModalModule
    ],
    declarations: [PopupComponent]
})
export class SharedModule {
}
