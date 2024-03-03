import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsDetailsComponent } from './pages/students-details/students-details.component';
import { adminGuard } from '../../../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },
  {
    path: ':id',
    canActivate: [adminGuard],
    component: StudentsDetailsComponent,
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
export class StudentsRoutingModule {}
