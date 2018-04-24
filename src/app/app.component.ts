import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {

  public isLoggedIn;

  public userDisplayName;

  public userEmail;

  public constructor(private authService: AuthService, private router: Router) {
    this.authService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log('Logged out');
          this.isLoggedIn = false;
          this.userDisplayName = '';
          this.userEmail = '';
          this.router.navigate(['login']);
        } else {
          this.isLoggedIn = true;
          this.userDisplayName = auth.displayName;
          this.userEmail = auth.email;
          console.log('Logged in');
          console.log(auth);
          this.router.navigate(['']);
        }
      });
  }
}
