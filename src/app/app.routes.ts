import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'attractions',
        loadChildren: () =>
          import('./features/attractions/attractions.module').then(
            (m) => m.AttractionsModule
          ),
      },
      {
        path: 'pet-sales',
        loadChildren: () =>
          import('./features/pet-sales/pet-sales.module').then(
            (m) => m.PetSalesModule
          ),
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
