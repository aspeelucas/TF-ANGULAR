import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUsers } from '../../../../layouts/dashboard/pages/users/models/users.interface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set auth user': props<{ user: IUsers }>(),
    'Log out': emptyProps(),
  },
});
