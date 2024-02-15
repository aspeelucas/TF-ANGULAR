import { Injectable } from '@angular/core';
import { catchError, delay, finalize, mergeMap, of, tap } from 'rxjs';
import { ICourse } from './models/course.model';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertService } from '../../../../core/services/alert.service';
import { environment } from '../../../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoursesService {
  constructor(
    private loadingServices: LoadingService,
    private alertServices: AlertService,
    private httpClient: HttpClient
  ) {}

  getCourses() {
    this.loadingServices.setLoading(true);

    return this.httpClient
      .get<ICourse[]>(`${environment.apiUrl}courses`)
      .pipe(
        delay(1000),
        finalize(() => this.loadingServices.setLoading(false))
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al obtener los cursos');
          return of([]);
        })
      );
  }

  deleteCourseById(id: number) {
    this.loadingServices.setLoading(true);
    return this.httpClient
      .delete<ICourse>(`${environment.apiUrl}courses/${id}`)
      .pipe(mergeMap(() => this.getCourses()))
      .pipe(
        finalize(() => this.loadingServices.setLoading(false)),
        tap(() =>
          this.alertServices.showSuccess(
            'Curso eliminado',
            'El curso fue eliminado correctamente'
          )
        )
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al eliminar el curso');
          return of([]);
        })
      );
  }

  createCourse(course: ICourse) {
    this.loadingServices.setLoading(true);
    return this.httpClient

      .post<ICourse>(`${environment.apiUrl}courses`, course)
      .pipe(mergeMap(() => this.getCourses()))
      .pipe(
        finalize(() => this.loadingServices.setLoading(false)),
        tap(() =>
          this.alertServices.showSuccess(
            'Curso creado',
            'El curso fue creado correctamente'
          )
        )
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al crear el curso');
          return of([]);
        })
      );
  }

  updateCourseById(id: number, data: ICourse) {
    this.loadingServices.setLoading(true);
    return this.httpClient
      .put<ICourse>(`${environment.apiUrl}courses/${id}`, data)
      .pipe(mergeMap(() => this.getCourses()))
      .pipe(
        finalize(() => this.loadingServices.setLoading(false)),
        tap(() =>
          this.alertServices.showSuccess(
            'Curso actualizado',
            'El curso fue actualizado correctamente'
          )
        )
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al actualizar el curso');
          return of([]);
        })
      );
  }
}
