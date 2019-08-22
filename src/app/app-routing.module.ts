import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';
import {FlowerPageComponent} from './components/flower-page/flower-page.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'flowers/:id', component: FlowerPageComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
