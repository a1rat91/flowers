import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFullpageModule} from '@fullpage/angular-fullpage';
import {AppComponent} from './app.component';
import { NavigationService } from './services/navigation.service';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogoComponent} from './components/logo/logo.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {FlowerPageModule} from './components/flower-page/flower-page.module';
import {SharedModule} from './shared/shared.module';
import { MagicBgComponent } from './components/magic-bg/magic-bg.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    MainPageComponent,
    SwiperComponent,
    NotFoundComponent,
    NavigationComponent,
    MagicBgComponent,
  ],
  imports: [
    BrowserModule,
    AngularFullpageModule,
    AppRoutingModule,
    FlowerPageModule,
    SharedModule
  ],
  providers: [NavigationService, ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
