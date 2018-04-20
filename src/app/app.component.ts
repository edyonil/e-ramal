import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFirestore]
})
export class AppComponent {
  title = 'app';

  public data: Array<object> = [];

  items: Observable<any[]>;

  itemsCollections: any;

  constructor(private afs: AngularFirestore) {
    this.itemsCollections = afs.collection('ramais');
    this.items = this.itemsCollections.valueChanges()
  }
}
