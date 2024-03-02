import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../inscriptions.service';
import { UsersService } from '../../../../../core/services/users.service';
import { CoursesService } from '../../courses/courses.service';

@Injectable()
export class InscriptionsEffects {
  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionServices.getInscriptions().pipe(
          map((data) => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError((error) =>
            of(InscriptionsActions.loadInscriptionsFailure({ error }))
          )
        )
      )
    );
  });

  loadStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadStudent),
      concatMap(() =>
        this.usersService.getAllStudents().pipe(
          map((resp) => InscriptionsActions.loadStudentSuccess({ data: resp })),
          catchError((error) =>
            of(InscriptionsActions.loadStudentFailure({ error }))
          )
        )
      )
    );
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map((resp) => InscriptionsActions.loadCoursesSuccess({ data: resp })),
          catchError((error) =>
            of(InscriptionsActions.loadCoursesFailure({ error }))
          )
        )
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) =>
        this.inscriptionServices.createInscription(action.data).pipe(
          map((resp) =>
            InscriptionsActions.createInscriptionSuccess({ data: resp })
          ),
          catchError((error) =>
            of(InscriptionsActions.createInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  createInscriptionSuccess$ = createEffect
  (() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscriptionSuccess),
      concatMap(() => [InscriptionsActions.loadInscriptions(),InscriptionsActions.loadStudent(),InscriptionsActions.loadCourses()])
    );
  });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      concatMap((action) =>
        this.inscriptionServices.deleteInscription(action.id).pipe(
          map(() => InscriptionsActions.loadInscriptions()),
          catchError((error) =>
            of(InscriptionsActions.createInscriptionFailure({ error }))
          )
        )
      )
    );
  });


 

  constructor(
    private actions$: Actions,
    private inscriptionServices: InscriptionsService,
    private usersService: UsersService,
    private coursesService: CoursesService
  ) {}
}
