import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { Observable } from 'rxjs';
import {
  selectCourses,
  selectStudents,
} from '../../store/inscriptions.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../../courses/models/course.model';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IStudent } from '../../../students/models/student.model';
import { AlertService } from '../../../../../../core/services/alert.service';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrl: './inscription-dialog.component.scss',
})
export class InscriptionDialogComponent {
  students$: Observable<IStudent[]>;
  courses$: Observable<ICourse[]>;

  inscriptionForm: FormGroup;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<InscriptionDialogComponent>,
    private form: FormBuilder,
    private alertServices: AlertService
  ) {
    this.inscriptionForm = this.form.group({
      courseId: form.control('', Validators.required),
      studentId: form.control('', Validators.required),
    });
    this.store.dispatch(InscriptionsActions.loadStudent());
    this.store.dispatch(InscriptionsActions.loadCourses());
    this.students$ = this.store.select(selectStudents);
    this.courses$ = this.store.select(selectCourses);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.inscriptionForm.value);
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
      this.alertServices.showAlert({
        title: 'Error',
        text: 'Por favor, completa el formulario',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } else {
      this.store.dispatch(
        InscriptionsActions.createInscription({
          data: this.inscriptionForm.value,
        })
      );
      this.dialogRef.close();
    }
  }

  getErrorMessage(field: string): ValidationErrors | null {
    return this.inscriptionForm.get(field)?.errors || null;
  }
}
