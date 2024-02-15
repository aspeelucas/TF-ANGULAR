import { Injectable } from '@angular/core';
import { IUsers } from '../dashboard/pages/users/models/users.interface';
import { Router } from '@angular/router';
import { AlertService } from '../../core/services/alert.service';
import { Observable, delay, finalize, map, tap } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

interface ILoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: IUsers | null = null;

  constructor(
    private router: Router,
    private alertServices: AlertService,
    private loading: LoadingService,
    private httpClient: HttpClient
  ) {}

  private setAuthUser(user: IUsers): void {
    this.authUser = user;
    localStorage.setItem('token', user.token);
  }

  login(data: ILoginData): Observable<IUsers[]> {
    return this.httpClient
      .get<IUsers[]>(
        `${environment.apiUrl}users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        tap((response) => {
          if (!!response[0]) {
            this.setAuthUser(response[0]);
            this.router.navigate(['dashboard', 'home']);
          } else {
            this.alertServices.showError(
              'Email o Password invalidas',
              'Porfavor vuelva a intentar'
            );
          }
        })
      );
  }

  logOut(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('token');
  }

  verifyToken() {
    this.loading.setLoading(true);
    return this.httpClient
      .get<IUsers[]>(
        `${environment.apiUrl}users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        delay(1000),
        map((response) => {
          if (response.length) {
            this.setAuthUser(response[0]);
            return true;
          } else {
            this.authUser = null;
            localStorage.removeItem('token');
            return false;
          }
        }),
        finalize(() => this.loading.setLoading(false))
      );
  }
}
