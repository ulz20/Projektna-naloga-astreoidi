import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLogged = !!localStorage.getItem('authToken');

  if (!isLogged) {
    router.navigate(['/login']);
    return false;
  }
  else {
    return true;
  }
};
