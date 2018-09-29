import { Component, Inject } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RamalModel } from './ramal.model';


@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  providers: [AngularFirestore]
})
export class DialogComponent {

  form: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onConfirm(value: boolean): void {
    this.dialogRef.close(value);
  }
}
