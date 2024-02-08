import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private notification$ = new Subject<SweetAlertOptions>()

  constructor() {
    this.notification$.subscribe({
      next: (options) => {
        Swal.fire(options);
      },
    });
  }
  
  showAlert(options: SweetAlertOptions): void {
    this.notification$.next(options);
  }

  showSuccess(title: string, text: string): void {
   this.notification$.next({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }
}
