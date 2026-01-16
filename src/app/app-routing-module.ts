import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './feauters/authentication/login/login';
import { Register } from './feauters/authentication/register/register';
import { AsteroidiDate } from './feauters/asteroidi/asteroidi-date/asteroidi-date';
import { AsteroidiFave } from './feauters/asteroidi-fave/asteroidi-fave/asteroidi-fave';

import { authGuard } from './core/guards/auth-guard';


const routes: Routes = [
  {path: 'login', component: Login, data: { showHeader: false } }, 
  {path: 'register', component: Register, data: { showHeader: false }}, 
  {path: 'asteroidi-date', component: AsteroidiDate, canActivate: [authGuard]},
  {path: 'asteroidi-fave', component: AsteroidiFave, canActivate: [authGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
