import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentsDetailsComponent } from './pages/students-details/students-details.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent,
    StudentsDetailsComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, SharedModule],
})
export class StudentsModule {}
