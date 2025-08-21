import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn$) {
    const token = authService.getAccessToken();
    const decodedToken: any = jwtDecode(token!);
    if (decodedToken.role === 'ADMIN') {
      return true; 
    }
  }

  router.navigate(['/home']);
  return false;
};