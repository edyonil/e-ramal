import { Component, Inject } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RamalModel } from './ramal.model';


@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  providers: [AngularFirestore]
})
export class FormComponent {

  form: any;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder)
  {
    this.form = this.fb.group({

    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
