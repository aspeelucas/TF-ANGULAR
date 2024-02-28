import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.services';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUsers } from './pages/users/models/users.interface';
import { selectAuthUser } from '../../core/store/auth/selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  authUser$ : Observable<IUsers | null>;

  constructor(private router: Router, private authService: AuthService, private store: Store) {
   this.authUser$ = this.store.select(selectAuthUser);
  }

  logout() {
    this.authService.logOut();
  }
}
