import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(r => r.routes),
    },
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
];
