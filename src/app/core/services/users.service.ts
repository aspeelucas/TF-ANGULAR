import { Injectable } from '@angular/core';
import { IUsers } from '../../layouts/dashboard/pages/users/models/users.interface';
import { Observable, catchError, delay, mergeMap, of, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { IPagination } from '../models/pagination';

const ROLES_DB: string[] = ['Admin', 'Estudiante'];
let USERS_DB: IUsers[] = [];

@Injectable()
export class UsersService {
  constructor(
    private alertServices: AlertService,
    private htttpClient: HttpClient
  ) {
    console.log('Servicio instanciado');
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB).pipe(delay(1000));
  }

  getUsers() {
    return this.htttpClient.get<IUsers[]>(`${environment.apiUrl}users`);
  }
  paginate(page: number, perPage = 5) {
    return this.htttpClient
      .get<IPagination<IUsers>>(
        `${environment.apiUrl}users?_page=${page}&_per_page=${perPage}`
      )
      .pipe(delay(1000));
  }

  getUserById(id: number | string): Observable<IUsers | undefined> {
    USERS_DB.find((user) => user.id == id);
    return of(USERS_DB.find((user) => user.id == id)).pipe(delay(1000));
  }

  createUser(payload: IUsers) {
    return this.htttpClient
      .post<IUsers>(`${environment.apiUrl}users`, payload)
      .pipe(mergeMap(() => this.getUsers()))
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Usuario creado',
            'El usuario fue creado correctamente'
          )
        )
      );
  }
  deleteUser(id: number) {
    return this.htttpClient
      .delete<IUsers>(`${environment.apiUrl}users/${id}`)
      .pipe(mergeMap(() => this.getUsers()))
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Usuario eliminado',
            'El usuario fue eliminado correctamente'
          )
        )
      );
  }
  updateUserById(id: number, payload: IUsers) {
    return this.htttpClient
      .put<IUsers>(`${environment.apiUrl}users/${id}`, payload)
      .pipe(mergeMap(() => this.getUsers()))
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Usuario actualizado',
            'El usuario fue actualizado correctamente'
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
}
