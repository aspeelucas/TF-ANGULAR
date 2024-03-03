import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../../../../core/services/alert.service';
import { IStudent } from '../../models/student.model';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    private alertServices: AlertService,
    @Inject(MAT_DIALOG_DATA) private editingStudent?: IStudent
  ) {
    console.log(editingStudent);
    this.studentForm = this.fb.group({
      firstName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('', [Validators.required]),
      role: this.fb.control('', Validators.required),
    });
    if (editingStudent) {
      this.studentForm.patchValue(editingStudent);
    }
  }
  onSave(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.alertServices.showAlert({
        title: 'Error',
        text: 'Por favor, completa el formulario',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
  getErrorMessage(field: string): ValidationErrors | null {
    return this.studentForm.get(field)?.errors || null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
