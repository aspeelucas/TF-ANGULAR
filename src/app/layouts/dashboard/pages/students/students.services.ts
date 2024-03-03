import { Injectable } from '@angular/core';
import { AlertService } from '../../../../core/services/alert.service';
import { HttpClient } from '@angular/common/http';
import { IStudent } from './models/student.model';
import { environment } from '../../../../../environments/environments';
import { Observable, catchError, delay, mergeMap, of, tap } from 'rxjs';
import { IPagination } from '../../../../core/models/pagination';

let STUDENT_DB: IStudent[] = [];

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(
    private alertServices: AlertService,
    private htttpClient: HttpClient
  ) {}

  getStudents() {
    return this.htttpClient
      .get<IStudent[]>(`${environment.apiUrl}students`)
      .pipe(delay(1000))
      .pipe(
        catchError((error) => {
          this.alertServices.showError(
            'Error',
            'Error al obtener los usuarios'
          );
          return of([]);
        })
      );
  }

  paginate(page: number, perPage = 5) {
    return this.htttpClient
      .get<IPagination<IStudent>>(
        `${environment.apiUrl}students?_page=${page}&_per_page=${perPage}`
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError(
            'Error',
            'Error al obtener los alumnos paginados'
          );
          return of<IPagination<IStudent>>({ data: [], items: 0 });
        })
      );
  }

  getUserById(id: number | string): Observable<IStudent | undefined> {
    return this.htttpClient
      .get<IStudent>(`${environment.apiUrl}students/${id}`)
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al obtener el alumno');
          return of(undefined);
        })
      );
  }

  createUser(payload: IStudent) {
    return this.htttpClient
      .post<IStudent>(`${environment.apiUrl}students`, {
        ...payload,
      })
      .pipe(mergeMap(() => this.getStudents()))
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Alumno Agregado',
            'El alumno fue creado correctamente'
          )
        )
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al crear el alumno');
          return of([]);
        })
      );
  }

  deleteUser(id: number) {
    return this.htttpClient
      .delete<IStudent>(`${environment.apiUrl}students/${id}`)
      .pipe(mergeMap(() => this.getStudents()))
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Alumno eliminado',
            'El Alumno fue eliminado correctamente'
          )
        )
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al eliminar el Alumno');
          return of([]);
        })
      );
  }

  updateUserById(id: number, payload: IStudent) {
    return this.htttpClient
      .put<IStudent>(`${environment.apiUrl}students/${id}`, payload)
      .pipe(mergeMap(() => this.getStudents()))
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Alumno actualizado',
            'El Alumno fue actualizado correctamente'
          )
        )
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError(
            'Error',
            'Error al actualizar el usuario'
          );
          return of([]);
        })
      );
  }

  getAllStudents(): Observable<IStudent[]> {
    return this.htttpClient.get<IStudent[]>(
      `${environment.apiUrl}students?role=Alumno`
    );
  }
}
