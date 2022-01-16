import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.module').then( m => m.CountryPageModule)
  },
  {
    path: 'cities/:id',
    loadChildren: () => import('./cities/cities.module').then( m => m.CitiesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reserver/:id',
    loadChildren: () => import('./reserver/reserver.module').then( m => m.ReserverPageModule)
  },
  {
    path: 'reservation-list',
    loadChildren: () => import('./reservation-list/reservation-list.module').then( m => m.ReservationListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
