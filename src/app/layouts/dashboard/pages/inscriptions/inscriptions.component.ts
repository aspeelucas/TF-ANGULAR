import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscriptions } from './store/inscriptions.selectors';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { IInscription } from './models/inscription.intarface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent {
  inscriptions$: Observable<IInscription[]>;
  dataSource: IInscription[] = [];
  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'courseName',
    'price',
    'actions',
  ];

  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(InscriptionsActions.loadInscriptions());
    this.inscriptions$ = this.store.select(selectInscriptions),
    this.inscriptions$.subscribe({
      next: (inscriptions) => {
        this.dataSource = inscriptions;
      },
    });
  }

  openInscriptionDialog(): void {
    this.dialog.open(InscriptionDialogComponent);
  }

  deleteInscription(id: number): void {
    this.store.dispatch(InscriptionsActions.deleteInscription({ id }));
  }


showModalDeleted( ev : number ): void {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar esta inscripcion?',
      text: 'Los cambios no se podran revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteInscription(ev);
      }
    });
  }
 
  
  
}
