import { createReducer, on } from '@ngrx/store';
import { IUsers } from '../../../../layouts/dashboard/pages/users/models/users.interface';
import { authActions } from '../actions';

export const featureName = 'auth';
export interface AuthState {
  user: IUsers | null;
}

const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.setAuthUser, (state, actions) => {
    return {
      ...state,
      user: actions.user,
    };
  }),
  on(authActions.logOut, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);
