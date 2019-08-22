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
import {FlowerPageModule} from './components/flower-page/flower-page.module'; //TODO перенести в app-routing.module
import {SharedModule} from './shared/shared.module';


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
  ],
  imports: [
    BrowserModule,
    AngularFullpageModule,
    AppRoutingModule,
    FlowerPageModule,//TODO перенести в app-routing.module
    SharedModule
  ],
  providers: [NavigationService, ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
