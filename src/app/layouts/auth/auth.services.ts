import { Injectable } from '@angular/core';
import { IUsers } from '../dashboard/pages/users/models/users.interface';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';
import { delay, finalize, map, of, tap } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';

interface ILoginData {
  email: string;
  password: string;
}

const MOCK_USER = {
  id: 1,
  firstName: 'Jorge',
  lastName: 'Test',
  email: 'testemail@gmail',
  role: 'admin',
  phone: 1234567890,
  password: 'test',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: IUsers | null = null;

  constructor(
    private router: Router,
    private alertServices: AlertService,
    private loading: LoadingService
  ) {}

  private setAuthUser(mockUser: IUsers): void {
    this.authUser = mockUser;
    localStorage.setItem('token', '1234567890asdasd');
  }

  login(data: ILoginData): void {
    if (
      data.email === MOCK_USER.email &&
      data.password === MOCK_USER.password
    ) {
      this.setAuthUser(MOCK_USER);
      // localStorage.setItem('token', '1234567890asdasd');
      this.router.navigate(['dashboard', 'home']);
    } else {
      this.alertServices.showError(
        'Email o Password invalidas',
        'Porfavor vuelva a intentar'
      );
    }
  }

  logOut(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken() {
    this.loading.setLoading(true);
    return of(localStorage.getItem('token')).pipe(
      delay(1000),
      map((response) => !!response),
      tap(() => {
        this.setAuthUser(MOCK_USER);
      }),
      finalize(() => this.loading.setLoading(false))
    );
  }
}
