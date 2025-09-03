import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Course } from '../../models/course.model';
import { StarRatingComponent } from '../star-rating/star-rating.component'; // Import for the rating display

@Component({
  selector: 'app-my-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent],
  templateUrl: './my-course-card.component.html',
  styleUrls: ['./my-course-card.component.scss']
})
export class MyCourseCardComponent {
  @Input() enrollment: any;
}