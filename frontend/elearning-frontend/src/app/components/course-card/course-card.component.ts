import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink, StarRatingComponent],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() progress: number | undefined;
}