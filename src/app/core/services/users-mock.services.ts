import { Injectable } from '@angular/core';
import { IUsers } from '../../layouts/dashboard/pages/users/models/users.interface';
import { Observable, delay, of, tap } from 'rxjs';
import { AlertService } from './alert.service';

const ROLES_DB: string[] = ['Admin', 'Estudiante'];
let USERS_DB: IUsers[] = [
  {
    id: 1,
    firstName: 'Lucas',
    lastName: 'Garcia',
    email: 'lucasgarcia@gmail.com',
    phone: 123456789,
    role: 'Admin',
  },
  {
    id: 2,
    firstName: 'Pedro',
    lastName: 'Tobalada',
    email: 'ptobalda@gmail.com',
    phone: 123456789,
    role: 'Estudiante',
  },
];

@Injectable()
export class UsersMockService {
  constructor(private alertServices: AlertService) {
    console.log('Servicio instanciado mock');
  }
  getRoles(): Observable<string[]> {
    return of(ROLES_DB).pipe(delay(1000));
  }

  getUsers() {
    return of(USERS_DB).pipe(delay(1000));
  }
  getUserById(id: number | string): Observable<IUsers | undefined> {
    USERS_DB.find((user) => user.id === id);
    return of(USERS_DB.find((user) => user.id == id)).pipe(delay(1000));
  }

  createUser(payload: IUsers) {
    USERS_DB.push(payload);
    return this.getUsers().pipe(
      tap(() =>
        this.alertServices.showSuccess(
          'Usuario creado',
          'El usuario fue creado correctamente'
        )
      )
    );
  }

  deleteUser(id: number) {
    USERS_DB = USERS_DB.filter((user) => user.id !== id);
    return this.getUsers().pipe(
      tap(() =>
        this.alertServices.showSuccess(
          'Usuario eliminado',
          'El usuario fue eliminado correctamente'
        )
      )
    );
  }

  updateUserById(id: number, payload: IUsers) {
    USERS_DB = USERS_DB.map((user) =>
      user.id === id ? { ...user, ...payload } : user
    );
    return this.getUsers().pipe(
      tap(() =>
        this.alertServices.showSuccess(
          'Usuario actualizado',
          'El usuario fue actualizado correctamente'
        )
      )
    );
  }
}
