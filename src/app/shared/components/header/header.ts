import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  constructor( private authService: Auth) { }


  onLogout() {
    this.authService.logout();
  }

  displayUserName() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user.name+' '+user.surname || 'Guest';
    }
    return 'Guest';
  }

  isUserLoggedIn(): boolean {
  const currentUser = localStorage.getItem('currentUser');
  //vrne true ce user obstaja čene da false
  return !!currentUser;
  }

  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }


}
