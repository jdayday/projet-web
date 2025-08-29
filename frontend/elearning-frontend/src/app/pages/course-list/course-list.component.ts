import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// Services
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { CourseService } from '../../services/course.service';
// Models
import { Course } from '../../models/course.model';

// Reusable Components
import { CourseGridCardComponent } from '../../components/course-grid-card/course-grid-card.component';
import { CourseCarouselComponent } from "../../components/course-carousel/course-carousel.component";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CourseGridCardComponent,
    CourseCarouselComponent
],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  featuredCourses: Course[] = [];
  allCourses: Course[] = [];
  categories: any[] = [];
  sidebarCategories: any[] = [];
  divisions = [
    'BASE_7', 'BASE_8', 'BASE_9', 'SECONDAIRE_1', 'SECONDAIRE_2', 'SECONDAIRE_3',
    'BAC_INFO', 'BAC_MATH', 'BAC_SCIENCE', 'BAC_SPORT', 'CONCOURS',
  ];

  loading = false;
  activeDivision: string | null = null;
  activeCategoryId: number | null = null;
  sidebarFilterForm: FormGroup;
  isCategoryFilterOpen = true;
  isRatingFilterOpen = true;
  isDurationFilterOpen = true;

  showAllCategories = false;

  constructor(
    private courseService: CourseService,
    public authService: AuthService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.sidebarFilterForm = this.fb.group({
      minRating: [null],
      minDuration: [null],
      maxDuration: [null],
      categoryId: [null],
      sortBy: ['highest_rated'],
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.activeDivision = params.get('division');
      this.loadInitialData();
    });

    this.sidebarFilterForm.valueChanges.subscribe(() => {
      this.loadAllCourses();
    });
  }

  loadInitialData(): void {
    this.activeCategoryId = null;
    this.loadFeaturedCourses();
    this.loadAllCourses();
    this.loadCategories();
    this.loadCategoriesForSidebar();
  }

  loadFeaturedCourses(): void {
    this.loading = true;
    this.courseService
      .getAllCourses({
        categoryId: this.activeCategoryId,
        division: this.activeDivision
      })
      .subscribe({
        next: (data) => {
          this.featuredCourses = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading featured courses:', error);
          this.loading = false;
        },
      });
  }

  loadAllCourses(): void {
    const sidebarFilters = this.sidebarFilterForm.value;
    this.courseService
      .getAllCourses({
        categoryId: sidebarFilters.categoryId,
        division: this.activeDivision,
        minRating: sidebarFilters.minRating,
        minDuration: sidebarFilters.minDuration,
        maxDuration: sidebarFilters.maxDuration
      })
      .subscribe((data) => {
        this.allCourses = data;
      });
  }

  loadCategories(): void {
    this.categoryService
      .getAllCategories(this.activeDivision)
      .subscribe((data) => {
        this.categories = data;
      });
  }

  loadCategoriesForSidebar(): void {
    this.categoryService
      .getAllCategories(this.activeDivision)
      .subscribe((data) => {
        this.sidebarCategories = data;
      });
  }

  onSelectDivision(division: string): void {
    this.activeDivision = division;
    this.activeCategoryId = null;
    this.showAllCategories = false; 
    this.loadFeaturedCourses();
    this.loadAllCourses();
    this.loadCategories();
    this.loadCategoriesForSidebar();
  }

  onFilterByCategory(categoryId: number | null): void {
    this.activeCategoryId = categoryId;
    this.loadFeaturedCourses();
  }

  toggleRadioFilter(formControlName: string, value: any): void {
    const control = this.sidebarFilterForm.get(formControlName);
    if (control) {
      if (control.value === value) {
        control.reset();
      } else {
        control.setValue(value);
      }
    }
  }

  toggleDurationFilter(min: number | null, max: number | null): void {
  const minControl = this.sidebarFilterForm.get('minDuration');
  const maxControl = this.sidebarFilterForm.get('maxDuration');

  if (minControl && maxControl) {
    if (minControl.value === min && maxControl.value === max) {
      minControl.reset();
      maxControl.reset();
    } else {
      minControl.setValue(min);
      maxControl.setValue(max);
    }
  }
}


}