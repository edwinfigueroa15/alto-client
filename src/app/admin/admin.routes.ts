import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./admin.component"),
        children: [
            {
                path: 'statistics',
                loadComponent: () => import('./pages/statistics/statistics.component'),
            },
            {
                path: 'matches',
                loadComponent: () => import('./pages/matches/matches.component'),
            },
            {
                path: 'team',
                loadComponent: () => import('./pages/team/team.component'),
            },
            {
                path: '',
                redirectTo: 'statistics',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'statistics',
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
