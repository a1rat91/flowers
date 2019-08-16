import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFullpageModule} from '@fullpage/angular-fullpage';

import {AppComponent} from './app.component';
import { FlowersService } from './services/flowers.service';
import { NavigationService } from './services/navigation.service';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogoComponent} from './components/logo/logo.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {FlowerPageComponent} from './components/flower-page/flower-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    MainPageComponent,
    FlowerPageComponent,
    SwiperComponent,
    NotFoundComponent,
    NavigationComponent,

  ],
  imports: [
    BrowserModule,
    AngularFullpageModule,
    AppRoutingModule,

  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
