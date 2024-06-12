import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./admin.component"),
        children: [
            {
                path: 'team',
                loadComponent: () => import('./pages/team/team.component'),
            },
            {
                path: 'matches',
                loadComponent: () => import('./pages/matches/matches.component'),
            },
            {
                path: '',
                redirectTo: 'team',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'team',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
