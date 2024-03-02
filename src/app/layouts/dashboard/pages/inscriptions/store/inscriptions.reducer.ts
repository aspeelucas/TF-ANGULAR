import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { IInscription } from '../models/inscription.intarface';
import { IUsers } from '../../users/models/users.interface';
import { ICourse } from '../../courses/models/course.model';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscriptions: IInscription[];
  students: IUsers[];
  courses: ICourse[];
  loading: boolean;
  error: unknown;
  loadingStudent: boolean;
}

export const initialState: State = {
  inscriptions: [],
  students: [],
  courses: [],
  loading: false,
  loadingStudent: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, (state) => ({
    ...state,
    loading: true,
  })),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => ({
    ...state,
    loading: false,
    inscriptions: action.data,
  })),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(InscriptionsActions.loadStudent, (state) => {
    return {
      ...state,
      loadingStudent: true,
    };
  }),
  on(InscriptionsActions.loadStudentSuccess, (state, action) => {
    return {
      ...state,
      loadingStudent: false,
      students: action.data,
    };
  }),
  on(InscriptionsActions.loadStudentFailure, (state, action) => {
    return {
      ...state,
      loadingStudent: false,
      error: action.error,
    };
  }),
  on(InscriptionsActions.loadCourses, (state) => ({
    ...state,
  })),
  on(InscriptionsActions.loadCoursesSuccess, (state, action) => ({
    ...state,
    courses: action.data,
  })),
  on(InscriptionsActions.loadCoursesFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});
