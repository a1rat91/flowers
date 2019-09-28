import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {AngularFullpageModule} from '@fullpage/angular-fullpage';
import {LazyLoadImageModule} from 'ng-lazyload-image';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';

import {MainPageComponent} from './pages/main-page/main-page.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

import {NavigationService} from './services/navigation.service';

import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogoComponent} from './shared/components/logo/logo.component';
import { Fake3dModule } from './components/fake3d/public-api';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './shared/auth.interceptor';
import {PostComponent} from './shared/components/post/post.component';

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
}

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        MainPageComponent,
        NotFoundComponent,
        NavigationComponent,
        HeaderComponent,
        FooterComponent,
        LogoComponent,
        PostComponent
    ],
    imports: [
        BrowserModule,
        AngularFullpageModule,
        LazyLoadImageModule,
        AppRoutingModule,
        SharedModule,
        Fake3dModule
    ],
    providers: [NavigationService, INTERCEPTOR_PROVIDER],
    bootstrap: [AppComponent]
})
export class AppModule {
}
