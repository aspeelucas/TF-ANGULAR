import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from '../../models/student.model';
import { StudentsService } from '../../students.services';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { InscriptionsService } from '../../../inscriptions/inscriptions.service';
import { IInscription } from '../../../inscriptions/models/inscription.intarface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrl: './students-details.component.scss',
})
export class StudentsDetailsComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'phone', 'role'];
  displayedColumnsCourses: string[] = [
    'id2',
    'name',
    'start',
    'end',
    'price',
    'actions',
  ];
  dataSource: IStudent[] = [];
  dataSourceCourses: IInscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private studentServices: StudentsService,
    private loadingServices: LoadingService,
    private inscriptionServices: InscriptionsService
  ) {
    this.loadingServices.setLoading(true);
    this.studentServices
      .getUserById(this.route.snapshot.params['id'])
      .subscribe({
        next: (findedUser) => {
          console.log(findedUser);
          if (findedUser) {
            this.dataSource = [findedUser];
          }
        },
        complete: () => this.loadingServices.setLoading(false),
      });

    this.inscriptionServices
      .getInscriptionByStudentId(this.route.snapshot.params['id'])
      .subscribe({
        next: (findedCourses) => {
          console.log(findedCourses);
          if (findedCourses) {
            this.dataSourceCourses = findedCourses;
          }
        },
        complete: () => this.loadingServices.setLoading(false),
      });
  }

  deleteInscription(id: number) {
    this.loadingServices.setLoading(true);
    this.inscriptionServices.deleteInscription(id).subscribe({
      next: () => {
        this.dataSourceCourses = this.dataSourceCourses.filter(
          (course) => course.id !== id
        );
      },
      complete: () => this.loadingServices.setLoading(false),
    });
  }

  showModalDeleted(ev: number): void {
    Swal.fire({
      title: 'Estas seguro que deseas dar de baja a este curso?',
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
