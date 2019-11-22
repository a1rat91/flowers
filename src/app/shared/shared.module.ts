import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {LoaderModule} from '../components/loader/loader.module';

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot(),
        LoaderModule
    ],
    exports: [
        HttpClientModule,
        QuillModule,
        LoaderModule
    ],
    declarations: []
})
export class SharedModule {
}
