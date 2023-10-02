import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/appUser/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListPersonComponent } from './components/person/list/listPerson.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuardLogin } from './shared/guards/AuthGuardLogin';
import { AuthGuard } from './shared/guards/AuthGuard';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginPageComponent,
    canActivate: [AuthGuardLogin]
  },
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      {
        path: 'List',
        component: ListPersonComponent
      },
      {
        path: '',
        component: WelcomeComponent
      },
    ],
    canActivate: [AuthGuard]
  },
 
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: 'Login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
