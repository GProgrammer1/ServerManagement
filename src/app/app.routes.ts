import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ServerListComponent } from './server-list/server-list.component';
import { serverListResolver } from './server-list.resolver';

export const routes: Routes = [
    {path: '' , component: MainPageComponent, resolve: {response : serverListResolver}},
    {path: 'error', component: ErrorComponent}
];
