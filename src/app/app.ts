import { Component, signal } from '@angular/core';
import { Auth } from './core/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('asteroidi');

   constructor(private authService: Auth){} 

   isUserLoggedin(): boolean {
    return this.authService.isLoggedIn();
   }
}
