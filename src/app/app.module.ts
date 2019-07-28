import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
  ],
  imports: [
      BrowserModule,
      AngularFullpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
