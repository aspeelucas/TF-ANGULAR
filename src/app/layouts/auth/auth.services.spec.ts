import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.services';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IUsers } from '../dashboard/pages/users/models/users.interface';

describe('Pruebas del AuthServices', () => {
  let authService: AuthService;
  let httpControler: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe instanciarse correctamente', () => {
    expect(authService).toBeTruthy();
  });
  it('Al llamar login() debe establecer un authUser', () => {
    const MOCK_RESPONSE: IUsers[] = [
      {
        id: 13,
        firstName: 'MOCKNAME',
        lastName: 'MOCKLASTNAME',
        email: 'testemail@gmail',
        phone: 31231231,
        password: 'test',
        role: 'Admin',
        token: 'dasdasdasd',
      },
    ];
    authService
      .login({ email: 'testemail@gmail', password: 'test' })
      .subscribe({
        next: (user) => {
          expect(authService.login).toBeTruthy();
          expect(authService.login).toEqual(MOCK_RESPONSE[0]);
        },
      });
    authService.login;
    httpControler
      .expectOne({
        url: 'http://localhost:3000/users?email=testemail@gmail&password=test',
        method: 'GET',
      })
      .flush(MOCK_RESPONSE);
  });
});
