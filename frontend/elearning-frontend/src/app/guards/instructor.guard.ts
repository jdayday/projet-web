import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const instructorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userRole$.pipe(
    map(role => {
      if (role === 'INSTRUCTOR' || role === 'ADMIN') {
        return true; 
      } else {
        router.navigate(['/']);
        return false; 
      }
    })
  );
};