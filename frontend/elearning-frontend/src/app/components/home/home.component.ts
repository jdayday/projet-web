import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';

// Import Services
import { AuthService } from '../../services/auth.service';
import { HomepageService } from '../../services/homepage.service';
import { CourseService } from '../../services/course.service'; 

// Import Models
import { Course } from '../../models/course.model';
import { User } from '../../models/user.model';

import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { PromoVideoComponent } from './promo-video/promo-video.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CourseFilterComponent } from '../course-filter/course-filter.component';
import { FormsModule } from '@angular/forms';
import { CourseCarouselComponent } from '../course-carousel/course-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroSectionComponent,
    PromoVideoComponent,
    TestimonialsComponent,
    CourseCardComponent,
    CourseFilterComponent,
    FormsModule, 
    CourseCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  homepageData$: Observable<any> | null = null;

  filteredCourses: Course[] = [];
  searchQuery = '';

  constructor(
    private authService: AuthService,
    private homepageService: HomepageService,
    private courseService: CourseService,
    private router: Router ,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.homepageData$ = this.homepageService.getPersonalizedHomepage();
        this.filteredCourses = []; 
      } else {
        this.homepageData$ = of(null);
      }
    });
  }

  onFiltersChanged(filters: { division: string | null; categoryId: number | null }): void {
    this.isLoggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.courseService.getAllCourses({
          categoryId: filters.categoryId,
          division: filters.division
        }).subscribe(data => {
          this.filteredCourses = data;
        });
      }
    });
  }

  onSearchSubmit(query: string): void {
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    } 
  }
}