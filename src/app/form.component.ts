import { Component, Inject } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RamalModel } from './ramal.model';


@Component({
  selector: 'app-form-component',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [AngularFirestore]
})
export class FormComponent {

  form: any;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        'nome': new FormControl((data) ? data.nome : '', [Validators.required]),
        'setor': new FormControl((data) ? data.setor : '', [Validators.required]),
        'ramal': new FormControl((data) ? data.ramal : '', [Validators.required])
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    const data = this.form.value;
    if (this.data.id) {
      data.id = this.data.id;
    }

    this.dialogRef.close(data);
  }

  get nome() { return this.form.get('nome'); }
  get setor() { return this.form.get('setor'); }
  get ramal() { return this.form.get('ramal'); }

}
