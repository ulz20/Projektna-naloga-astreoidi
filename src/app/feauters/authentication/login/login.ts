import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router: Router, private auth: Auth) {}

  loginFields = {
    email: '',
    password: ''
  };

  wrongCredentials: boolean = false;

  submitForm() {
    this.auth.login(this.loginFields).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/asteroidi-date']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.wrongCredentials = true;
      }
    });
  }


}
