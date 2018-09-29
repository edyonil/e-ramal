import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import {FormComponent} from './../form.component';
import { DialogComponent } from './../dialog.component';


@Component({
  selector: 'app-ramal',
  templateUrl: './ramal.component.html',
  styleUrls: ['./ramal.component.css'],
  providers: [AngularFirestore]
})
export class RamalComponent {
  items$: Observable<any[]>;
  ramal$: BehaviorSubject<string|null>;
  setor$: BehaviorSubject<string|null>;

  title = 'app';
  items: any;

  displayedColumns = ['nome', 'setor', 'ramal', 'edit'];

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

  openDialog(doc = null): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: doc
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.update(result);
          return;
        }
        this.itemsCollections.add(result);
      }
    });
  }

  add(data) {
    this.itemsCollections.add(data);
  }

  update(data) {
    this.itemsCollections.doc(data.id).update(data);
  }

  remove(doc) {
    this.itemsCollections.doc(doc.id).delete();
  }

  openDialogRemove(doc): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: doc
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(doc);
      }
    });
  }
}
