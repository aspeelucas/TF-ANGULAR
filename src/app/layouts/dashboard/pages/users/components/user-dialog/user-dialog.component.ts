import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../../../../core/services/alert.service';
import { IUsers } from '../../models/users.interface';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) private editingUser?: IUsers
  ) {
    console.log(editingUser);
    this.userForm = this.fb.group({
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
      password: this.fb.control('', [Validators.required]),
      role: this.fb.control('', Validators.required),
    });
    if (editingUser) {
      this.userForm.patchValue(editingUser);
    }
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.alertService.showAlert({
        title: 'Error',
        text: 'Por favor, completa el formulario',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } else{
      this.dialogRef.close(this.userForm.value);
    }
  }

  getErrorMessage(field: string): ValidationErrors | null {
    return this.userForm.get(field)?.errors || null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
