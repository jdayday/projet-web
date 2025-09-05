import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AvatarComponent } from '../avatar/avatar.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule,AvatarComponent ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isExploreMenuOpen = false; 
  isProfileMenuOpen  = false;
  itemCount$: Observable<number>;
  divisions = [
    'BASE_7', 'BASE_8', 'BASE_9', 'SECONDAIRE_1', 'SECONDAIRE_2', 'SECONDAIRE_3',
    'BAC_INFO', 'BAC_MATH', 'BAC_SCIENCE', 'BAC_SPORT', 'CONCOURS'
  ];
  searchQuery = '';

  currentUser$: Observable<User | null>;

  get userRole$() {
    return this.authService.userRole$;
  }
  constructor(private authService: AuthService, private router: Router,
   private courseService: CourseService,
   private cartService: CartService 
  ) {
        this.currentUser$ = this.authService.currentUser$;
        this.itemCount$ = this.cartService.itemCount$;

  }

  get isLoggedIn$() {
    return this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isProfileMenuOpen = false;
  }
  onSearchSubmit(query: string): void {
    console.log("Search query:", query);
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }


}