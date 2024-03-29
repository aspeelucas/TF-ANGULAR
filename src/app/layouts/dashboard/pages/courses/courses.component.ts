import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { ICourse } from './models/course.model';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../core/store/auth/selectors';
import { IUsers } from '../users/models/users.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  displayedColumns: string[] = [
    'id',
    'nameCourse',
    'start',
    'end',
    'price',
    'actions',
  ];
  courses: ICourse[] = [];
  currentUser: IUsers | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private storeServices: Store
  ) {
    this.getCurrentUser();
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  onCreateCourse(): void {
    this.dialog
      .open(CoursesDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService.createCourse(result).subscribe({
              next: (courses) => {
                this.courses = courses;
              },
            });
          }
        },
      });
  }

  onEditCourse(course: ICourse): void {
    this.dialog
      .open(CoursesDialogComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService.updateCourseById(course.id, result).subscribe({
              next: (courses) => {
                this.courses = courses;
              },
            });
          }
        },
      });
  }

  deleteCourse(id: number) {
    this.coursesService.deleteCourseById(id).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  getCurrentUser(): void {
    this.storeServices.select(selectAuthUser).subscribe({
      next: (user) => {
        console.log(user);
        this.currentUser = user;
      },
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'Admin';
  }

  showModalDeleted(ev: ICourse): void {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este curso?',
      text: 'Los cambios no se podran revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCourse(ev.id);
      }
    });
  }
}
