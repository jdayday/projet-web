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
//import { debounceTime, distinctUntilChanged,startWith } from 'rxjs';
//import { CourseCardComponent } from '../../components/course-card/course-card.component';

//Reusable Components
import { TopCoursesComponent } from '../../components/home/top-courses/top-courses.component';
import { CourseFilterComponent } from '../../components/course-filter/course-filter.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';



@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,  TopCoursesComponent,
    ReactiveFormsModule,
    CourseFilterComponent,
    CourseCardComponent

  ], 
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  categories: any[] = [];
  divisions = [
    'BASE_7', 'BASE_8', 'BASE_9', 'SECONDAIRE_1', 'SECONDAIRE_2', 'SECONDAIRE_3',
    'BAC_INFO', 'BAC_MATH', 'BAC_SCIENCE', 'BAC_SPORT', 'CONCOURS'
  ];

  loading = false;
  activeDivision: string | null = null;
  activeCategoryId: number | null = null;
  private currentSearchTerm = '';
  sidebarFilterForm: FormGroup;


  constructor(
    private courseService: CourseService,
    public authService: AuthService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) 
  {
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


    /*this.courseService.searchTerm$.pipe(
      startWith(''),
      debounceTime(300), 
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.currentSearchTerm = searchTerm;
      this.loadCourses();
    });*/
  }

    loadInitialData(): void {
    this.activeCategoryId = null; 
    this.loadCourses(); 
    this.categoryService.getAllCategories(this.activeDivision).subscribe(data => {
      this.categories = data;
    });
  }


  loadCourses(): void {
    this.loading = true;

    this.courseService.getAllCourses(undefined,
       this.activeCategoryId,
       this.activeDivision
      ).subscribe({    
      next: (data) => {
        console.log('Backend Response:', data);

        this.courses = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.loading = false;
      }
    });
  }

    loadAllCourses(): void {
    const sidebarFilters = this.sidebarFilterForm.value;
    
    // This fetches data ONLY for the main grid, using the page's division and sidebar filters
    this.courseService.getAllCourses(
      undefined, // No search term in this section
      null,      // No category filter in this section (we use the sidebar instead)
      this.activeDivision, // Use the division from the URL
      sidebarFilters.minRating,
      sidebarFilters.maxDuration
    ).subscribe(data => {
      this.courses = data;
    });
  }


  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

    onSelectDivision(division: string): void {
    this.activeDivision = division;
    this.activeCategoryId = null;
    this.loadCourses(); 
    
    this.categoryService.getAllCategories(this.activeDivision).subscribe(data => {
      this.categories = data;
    });
  }


  onFilterByCategory(categoryId: number | null): void {
    this.activeCategoryId = categoryId;
    this.loadCourses();
  }
}