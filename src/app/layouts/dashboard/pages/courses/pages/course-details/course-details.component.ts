import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';
import { ICourse } from '../../models/course.model';
import { IInscription } from '../../../inscriptions/models/inscription.intarface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'role',
    'actions',
  ];
  displayedColumnsCourses: string[] = ['id2', 'name', 'start', 'end', 'price'];

  dataSource: ICourse[] = [];
  dataSourceStudents: IInscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseServices: CoursesService,
    private loadingServices: LoadingService,
    private inscriptionServices: InscriptionsService
  ) {
    this.loadingServices.setLoading(true);
    this.courseServices
      .getCourseById(this.route.snapshot.params['id'])
      .subscribe({
        next: (findedCourse) => {
          if (findedCourse) {
            this.dataSource = [findedCourse];
          }
        },
        complete: () => this.loadingServices.setLoading(false),
      });

    this.inscriptionServices
      .getInscriptionByCourseId(this.route.snapshot.params['id'])
      .subscribe({
        next: (findedCourses) => {
          if (findedCourses) {
            this.dataSourceStudents = findedCourses;
          }
        },
        complete: () => this.loadingServices.setLoading(false),
      });
  }

  deleteInscription(id: number) {
    this.loadingServices.setLoading(true);
    this.inscriptionServices.deleteInscription(id).subscribe({
      next: () => {
        this.dataSourceStudents = this.dataSourceStudents.filter(
          (course) => course.id !== id
        );
      },
      complete: () => this.loadingServices.setLoading(false),
    });
  }

  showModalDeleted(ev: number): void {
    Swal.fire({
      title: 'Estas seguro que deseas dar de baja a este alumno?',
      text: 'Los cambios no se podran revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteInscription(ev);
      }
    });
  }
}
