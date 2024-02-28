import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UsersModule } from './pages/users/users.module';
import { HomeModule } from './pages/home/home.module';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './pages/users/pages/user-detail/user-detail.component';
import { adminGuard } from '../../core/guards/admin.guard';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    UsersModule,
    SharedModule,
    HomeModule,
    RouterModule.forChild([
      // PATH PARA /DASHBOARD

      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
        // component: HomeComponent,
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'users/:id',
        canActivate: [adminGuard],
        component: UserDetailComponent,
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./pages/courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
