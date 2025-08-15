import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn$) {
    return true; // If user is logged in, allow access
  }

  // If not logged in, redirect to the login page
  router.navigate(['/login']);
  return false;
};