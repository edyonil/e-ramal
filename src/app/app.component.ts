import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import {FormComponent} from './form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFirestore]
})
export class AppComponent {
  items$: Observable<any[]>;
  ramal$: BehaviorSubject<string|null>;
  setor$: BehaviorSubject<string|null>;

  title = 'app';
  items: any;

  displayedColumns = ['nome', 'setor', 'ramal'];

  itemsCollections: any;

  constructor(private afs: AngularFirestore, public dialog: MatDialog) {

    this.ramal$ = new BehaviorSubject(null);
    this.setor$ = new BehaviorSubject(null);
    this.items$ = Observable.combineLatest(
      this.ramal$,
      this.setor$
    ).switchMap(([ramal, setor]) => {
      this.itemsCollections = afs.collection('ramais', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (ramal) {query = query.where('ramal', '==', ramal); }
        if (setor) { query = query.where('setor', '==', setor); }
        return query;
      });
      return this.itemsCollections.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
    });
  }

  public filter() {
    this.setor$.next('getec');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '250px',
      data: this.itemsCollections
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
