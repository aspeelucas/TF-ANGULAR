import { Injectable } from '@angular/core';
import { IUsers } from '../../layouts/dashboard/pages/users/models/users.interface';
import { Observable, catchError, delay, mergeMap, of, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { IPagination } from '../models/pagination';

const ROLES_DB: string[] = ['Admin', 'Estudiante'];

@Injectable()
export class UsersMockService {
  constructor(
    private alertServices: AlertService,
    private htttpClient: HttpClient
  ) {
    console.log('Servicio instanciado mock');
  }

  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB).pipe(delay(1000));
  }

  getUsers() {
    return this.htttpClient
      .get<IUsers[]>(`${environment.apiUrl}users`)
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
      .get<IPagination<IUsers>>(
        `${environment.apiUrl}users?_page=${page}&_per_page=${perPage}`
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError(
            'Error',
            'Error al obtener los usuarios'
          );
          return of({ data: [], total: 0 });
        })
      );
  }

  getUserById(id: number | string): Observable<IUsers | undefined> {
    return this.htttpClient
      .get<IUsers>(`${environment.apiUrl}users/${id}`)
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al obtener el usuario');
          return of(undefined);
        })
      );
  }

  createUser(payload: IUsers) {
    return this.htttpClient
      .post<IUsers>(`${environment.apiUrl}users`, {
        ...payload,
        token: this.generateString(15),
      })
      .pipe(mergeMap(() => this.getUsers()))
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Usuario creado',
            'El usuario fue creado correctamente'
          )
        )
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al crear el usuario');
          return of([]);
        })
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
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al eliminar el usuario');
          return of([]);
        })
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
