import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LoginComponent } from './layouts/auth/pages/login/login.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // RUTA PARA DASHBOARD
  {
  path:'dashboard',
  component: DashboardComponent,
  loadChildren: () => import('./layouts/dashboard/dashboard.module').then(m => m.DashboardModule),
},
// RUTA PARA LOGIN
{
  path:'auth/login',
  component: LoginComponent,
},
// RUTA PARA 404
{
  path:'404',
  component: NotFoundComponent
},
// RUTA SI NO EXISTE NINGUNA DE LAS ANTERIORES
{
  path:'**',
  redirectTo: '/404'
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
