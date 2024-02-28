import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.services';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth/selectors';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const store = inject(Store);
  return store.select(selectAuthUser).pipe(
    map((user) => {
      if (user?.role === 'Admin') {
        return true;
      }
      return router.createUrlTree(['dashboard', 'home']);
    })
  );
};
