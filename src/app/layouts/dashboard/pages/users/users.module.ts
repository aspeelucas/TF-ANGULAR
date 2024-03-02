import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UsersService } from '../../../../core/services/users.service';
import { UsersMockService } from '../../../../core/services/users-mock.services';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [UsersComponent, UserDialogComponent, UserDetailComponent,UserDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', {}),
  ],
  exports: [UsersComponent],
  providers: [
    {
      provide: UsersService,
      useClass: UsersMockService,
    },
  ],
})
export class UsersModule {}
