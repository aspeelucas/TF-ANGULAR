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
        `${environment.apiUrl}inscriptions?_embed=user&_embed=course`
      )
      .pipe(
        delay(1000),
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
    return this.http.post<IInscription>(
      `${environment.apiUrl}inscriptions`,
      data
    );
  }

  getInscriptionById(id: number) {
    return this.http.get<IInscription>(
      `${environment.apiUrl}inscriptions/${id}?_embed=user&_embed=course`
    )
  }

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
