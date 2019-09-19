import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

const appRoutes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'flowers', loadChildren: './pages/flower-page/flower-page.module#FlowerPageModule'},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '/not-found'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules
        })],
    exports: [RouterModule]
})


export class AppRoutingModule {

}
