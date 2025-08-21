import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HeroSectionComponent } from '../../components/home/hero-section/hero-section.component';
import { PromoVideoComponent } from '../../components/home/promo-video/promo-video.component';
import { TopCoursesComponent } from './top-courses/top-courses.component';
import { CourseFilterComponent } from '../../components/course-filter/course-filter.component';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';






@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TestimonialsComponent,HeroSectionComponent,PromoVideoComponent,TopCoursesComponent,CourseFilterComponent,], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    filteredCourses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {}

  onFiltersChanged(filters: { division: string | null; categoryId: number | null }): void {
    this.courseService.getAllCourses({
      categoryId: filters.categoryId,
      division: filters.division
    })
      .subscribe(data => {
        this.filteredCourses = [...data];
      });
  }

}