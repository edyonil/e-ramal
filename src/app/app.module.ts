import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import {
  MatCardModule,
  MatTableModule,
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { FormComponent } from './form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  entryComponents: [FormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
