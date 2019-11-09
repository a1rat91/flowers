import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AngularFullpageModule} from '@fullpage/angular-fullpage';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {SharedModule} from './shared/shared.module';
import { Fake3dModule } from './components/fake3d/public-api';
import {CatalogModule} from './components/catalog/catalog.module';
import {ActionsModule} from './components/actions/actions.module';

import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavigationComponent} from './components/navigation/navigation.component';

import {LogoComponent} from './shared/components/logo/logo.component';
import {MouseComponent} from './shared/components/mouse/mouse.component';
import {SocComponent} from './shared/components/soc/soc.component';
import {NextSectionLinkComponent} from './shared/components/next-section-link/next-section-link.component';

import {NavigationService} from './services/navigation.service';
import {AuthInterceptor} from './shared/auth.interceptor';
import {Angular2PhotoswipeModule} from 'angular2_photoswipe';

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
};

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
        MouseComponent,
        SocComponent,
        NextSectionLinkComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AngularFullpageModule,
        LazyLoadImageModule,
        AppRoutingModule,
        Fake3dModule,
        CatalogModule,
        ActionsModule
    ],
    providers: [
        NavigationService,
        INTERCEPTOR_PROVIDER
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
