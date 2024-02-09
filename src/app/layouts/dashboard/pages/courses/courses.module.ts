import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { CoursesService } from './courses.service';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDialogComponent,
 
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ],
  providers: [
    CoursesService
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
