import { Injectable } from '@angular/core';
import { IUsers } from '../../layouts/dashboard/pages/users/models/users.interface';
import { Observable, catchError, delay, mergeMap, of, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

const ROLES_DB: string[] = ['Admin', 'Estudiante'];
let USERS_DB: IUsers[] = [
  // {
  //   id: 1,
  //   firstName: 'Lucas',
  //   lastName: 'Garcia',
  //   email: 'lucasgarcia@gmail.com',
  //   phone: 123456789,
  //   role: 'Admin',
  // },
  // {
  //   id: 2,
  //   firstName: 'Pedro',
  //   lastName: 'Tobalada',
  //   email: 'ptobalda@gmail.com',
  //   phone: 123456789,
  //   role: 'Estudiante',
  // },
];

@Injectable()
export class UsersMockService {
  constructor(
    private alertServices: AlertService,
    private htttpClient: HttpClient
  ) {
    console.log('Servicio instanciado mock');
  }
  getRoles(): Observable<string[]> {
    return of(ROLES_DB).pipe(delay(1000));
  }

  getUsers() {
    // return of(USERS_DB).pipe(delay(1000));
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
  getUserById(id: number | string): Observable<IUsers | undefined> {
    // USERS_DB.find((user) => user.id === id);
    // return of(USERS_DB.find((user) => user.id == id)).pipe(delay(1000));
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
    // USERS_DB.push(payload);
    // return this.getUsers().pipe(
    //   tap(() =>
    //     this.alertServices.showSuccess(
    //       'Usuario creado',
    //       'El usuario fue creado correctamente'
    //     )
    //   )
    // );
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
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError('Error', 'Error al crear el usuario');
          return of([]);
        })
      );
  }

  deleteUser(id: number) {
    // USERS_DB = USERS_DB.filter((user) => user.id !== id);
    // return this.getUsers().pipe(
    //   tap(() =>
    //     this.alertServices.showSuccess(
    //       'Usuario eliminado',
    //       'El usuario fue eliminado correctamente'
    //     )
    //   )
    // );
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
