import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  MatCardModule,
  MatTableModule,
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatDialogModule,
   MatFormFieldModule,
   MatInputModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { FormComponent } from './form.component';
import { DialogComponent } from './dialog.component';
import { LoginComponent } from './login/login.component';
import { RamalComponent } from './ramal/ramal.component';
import { AngularFireAuth } from 'angularfire2/auth';

const appRoutes: Routes = [
  { path: '', component: RamalComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DialogComponent,
    LoginComponent,
    RamalComponent
  ],
  entryComponents: [FormComponent, DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule { }
