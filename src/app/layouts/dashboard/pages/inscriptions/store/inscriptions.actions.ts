import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ICreateInscriptionData,
  IInscription,
} from '../models/inscription.intarface';

import { ICourse } from '../../courses/models/course.model';
import { IStudent } from '../../students/models/student.model';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: IInscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),
    // carga los estudiantes en lista
    'Load Student ': emptyProps(),
    'Load Student Success': props<{ data: IStudent[] }>(),
    'Load Student Failure': props<{ error: unknown }>(),
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: ICourse[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),
    'Create Inscription': props<{ data: ICreateInscriptionData }>(),
    'Create Inscription Success': props<{ data: IInscription }>(),
    'Create Inscription Failure': props<{ error: unknown }>(),
    'Delete Inscription': props<{ id: number }>(),
    'Delete Inscription Failure': props<{ error: unknown }>(),
  },
});
