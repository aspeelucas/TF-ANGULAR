import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { UsersService } from '../../../../../../core/services/users.service';
import { Observable } from 'rxjs';
import { IUsers } from '../../../users/models/users.interface';
import { selectCourses, selectStudents } from '../../store/inscriptions.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../../courses/models/course.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrl: './inscription-dialog.component.scss',
})
export class InscriptionDialogComponent {

  students$: Observable<IUsers[]>;
  courses$: Observable<ICourse[]>;

  inscriptionForm: FormGroup;

  constructor(private store: Store,private dialogRef: MatDialogRef<InscriptionDialogComponent>,private form :FormBuilder) {
    this.inscriptionForm= this.form.group({
      courseId: form.control('',Validators.required),
      userId: form.control('',Validators.required),
     
    })
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
   if(this.inscriptionForm.invalid)
    {
      this.inscriptionForm.markAllAsTouched();
    }
    else{
      this.store.dispatch(InscriptionsActions.createInscription({data: this.inscriptionForm.value}));
      this.dialogRef.close();
    }
  }

}
