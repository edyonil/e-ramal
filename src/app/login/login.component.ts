import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginWithGoogle().then((data) => {
      this.router.navigate(['']);
    });
  }

}
