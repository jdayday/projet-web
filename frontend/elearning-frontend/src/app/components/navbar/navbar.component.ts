import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isExploreMenuOpen = false; 
  divisions = [
    'BASE_7', 'BASE_8', 'BASE_9', 'SECONDAIRE_1', 'SECONDAIRE_2', 'SECONDAIRE_3',
    'BAC_INFO', 'BAC_MATH', 'BAC_SCIENCE', 'BAC_SPORT', 'CONCOURS'
  ];

  get userRole$() {
    return this.authService.userRole$;
  }
  constructor(private authService: AuthService, private router: Router,
   private courseService: CourseService 
  ) {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
    onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.courseService.setSearchTerm(input.value);
    this.router.navigate(['/courses']); // Optional: navigate to courses page on search
  }
}