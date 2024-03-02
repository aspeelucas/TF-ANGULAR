import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState = createFeatureSelector<fromInscriptions.State>(
  fromInscriptions.inscriptionsFeatureKey
);


export const selectInscriptions = createSelector(
  selectInscriptionsState,
  (state) => state.inscriptions
);

export const selectStudents = createSelector(
  selectInscriptionsState,
  (state) => state.students
);

export const selectCourses = createSelector(
  selectInscriptionsState,
  (state) => state.courses
)

;







