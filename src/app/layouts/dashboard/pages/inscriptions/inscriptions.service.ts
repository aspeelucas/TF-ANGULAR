import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import {
  ICreateInscriptionData,
  IInscription,
} from './models/inscription.intarface';
import { catchError, delay, finalize, map, mergeMap, of, tap } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  constructor(
    private http: HttpClient,
    private alertServices: AlertService,
    private loadingServices: LoadingService
  ) {}

  getInscriptions() {
    this.loadingServices.setLoading(true);
    return this.http
      .get<IInscription[]>(
        `${environment.apiUrl}inscriptions?_embed=student&_embed=course`
      )
      .pipe(
        delay(0.005),
        finalize(() => this.loadingServices.setLoading(false))
      )
      .pipe(
        catchError((error) => {
          this.alertServices.showError(
            'Error',
            'Error al obtener las inscripciones'
          );
          return [];
        })
      );
  }

  createInscription(data: ICreateInscriptionData) {
    return this.http
      .post<IInscription>(`${environment.apiUrl}inscriptions`, data)
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Inscripcion creada',
            'La Inscripcion fue creada correctamente'
          )
        )
      );
  }

  getInscriptionById(id: number) {
    return this.http.get<IInscription>(
      `${environment.apiUrl}inscriptions/${id}?_embed=student&_embed=course`
    );
  }

  // obtener inscripciones por id de estudiante
  getInscriptionByStudentId(id: number) {
    return this.http.get<IInscription[]>(
      `${environment.apiUrl}inscriptions?studentId=${id}&_embed=student&_embed=course`
    );
  }

  // obtener inscripciones por id de curso
  getInscriptionByCourseId(id: number) {
    return this.http.get<IInscription[]>(
      `${environment.apiUrl}inscriptions?courseId=${id}&_embed=student&_embed=course`
    );
  }

  //

  deleteInscription(id: number) {
    return this.http
      .delete<IInscription>(`${environment.apiUrl}inscriptions/${id}`)
      .pipe(
        tap(() =>
          this.alertServices.showSuccess(
            'Inscripcion eliminada',
            'La Inscripcion fue eliminado correctamente'
          )
        )
      );
  }
}
