import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-course-grid-card',
  standalone: true,
  imports: [CommonModule, RouterLink, StarRatingComponent],
  templateUrl: './course-grid-card.component.html',
  styleUrls: ['./course-grid-card.component.scss']
})
export class CourseGridCardComponent {
  @Input() course!: Course;
}