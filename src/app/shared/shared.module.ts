import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {LoaderModule} from '../components/loader/loader.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot(),
        LoaderModule,
        LazyLoadImageModule
    ],
    exports: [
        HttpClientModule,
        QuillModule,
        LoaderModule,
        LazyLoadImageModule
    ],
    declarations: []
})
export class SharedModule {
}
