import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsComponent } from './inscriptions.component';
import { InscriptionsDetailsComponent } from './pages/inscriptions-details/inscriptions-details.component';

const routes: Routes = [
  {
    path: '',
    component: InscriptionsComponent,
  },
  {
    path: ':id',
    component: InscriptionsDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionsRoutingModule {}
