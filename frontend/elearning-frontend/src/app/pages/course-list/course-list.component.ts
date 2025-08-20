import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
//Services
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { CourseService } from '../../services/course.service';
//Models
import { Course } from '../../models/course.model';

//Reusable Components
import { TopCoursesComponent } from '../../components/home/top-courses/top-courses.component';
import { CourseFilterComponent } from '../../components/course-filter/course-filter.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    TopCoursesComponent,
    ReactiveFormsModule,
    CourseFilterComponent,
    CourseCardComponent
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  featuredCourses: Course[] = [];
  allCourses: Course[] = [];
  categories: any[] = [];
  divisions = [
    'BASE_7', 'BASE_8', 'BASE_9', 'SECONDAIRE_1', 'SECONDAIRE_2', 'SECONDAIRE_3',
    'BAC_INFO', 'BAC_MATH', 'BAC_SCIENCE', 'BAC_SPORT', 'CONCOURS'
  ];

  loading = false;
  activeDivision: string | null = null;
  activeCategoryId: number | null = null;
  sidebarFilterForm: FormGroup;

  constructor(
    private courseService: CourseService,
    public authService: AuthService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.sidebarFilterForm = this.fb.group({
      minRating: [null],
      maxDuration: [null],
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
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
  }

  loadFeaturedCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses(
      undefined,
      this.activeCategoryId,
      this.activeDivision
    ).subscribe({
      next: (data) => {
        this.featuredCourses = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading featured courses:', error);
        this.loading = false;
      }
    });
  }

  loadAllCourses(): void {
    const sidebarFilters = this.sidebarFilterForm.value;
    this.courseService.getAllCourses(
      undefined,
      null, // Category filter is not used for the "All Courses" section
      this.activeDivision,
      sidebarFilters.minRating,
      sidebarFilters.maxDuration
    ).subscribe(data => {
      this.allCourses = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories(this.activeDivision).subscribe(data => {
      this.categories = data;
    });
  }

  onSelectDivision(division: string): void {
    this.activeDivision = division;
    this.activeCategoryId = null;
    this.loadFeaturedCourses();
    this.loadAllCourses();
    this.loadCategories();
  }

  onFilterByCategory(categoryId: number | null): void {
    this.activeCategoryId = categoryId;
    this.loadFeaturedCourses();
  }
}