import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UsersService } from '../../../../core/services/users.service';
import { UsersMockService } from '../../../../core/services/users-mock.services';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    UsersComponent
  ],
  providers: [
   {
      provide: UsersService,
      useClass: UsersMockService
   }
  ]
})
export class UsersModule { }
