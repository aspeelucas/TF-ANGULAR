import { Injectable } from '@angular/core';
import { IUsers } from '../../layouts/dashboard/pages/users/models/users.interface';
import { Observable, catchError, delay, mergeMap, of, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

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
    // USERS_DB = USERS_DB.map((user) =>
    //   user.id === id ? { ...user, ...payload } : user
    // );
    // return this.getUsers().pipe(
    //   tap(() =>
    //     this.alertServices.showSuccess(
    //       'Usuario actualizado',
    //       'El usuario fue actualizado correctamente'
    //     )
    //   )
    // );

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
