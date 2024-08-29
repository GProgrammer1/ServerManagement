import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { serverListResolver } from './server-list.resolver';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {path: '' , component: MainPageComponent, resolve: {response : serverListResolver}},
    {path: 'error', component: ErrorComponent}
   
];
