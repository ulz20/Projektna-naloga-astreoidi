import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
     
  registerFileds = {
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatPassword: ''
  }


  constructor(private auth: Auth, private router: Router) { }

  emailExists: boolean = false;

  submitForm(){

    var uid = self.crypto.randomUUID();
    

    this.registerFileds = {
      ...this.registerFileds,
      id: uid
    }

    const user = this.registerFileds;

    this.auth.finalRegistration(user).subscribe({
    next: (response) => {
      console.log('Response received:', response);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error(err);
      this.emailExists = true;
    }
  });
  }
}