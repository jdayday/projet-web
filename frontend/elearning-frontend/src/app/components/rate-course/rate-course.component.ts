import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingsService } from '../../services/ratings.service';

@Component({
  selector: 'app-rate-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.scss']
})
export class RateCourseComponent {
  @Input() courseId!: number;
  @Output() ratingSubmitted = new EventEmitter<any>();

  stars = [1, 2, 3, 4, 5];
  hoveredRating = 0;
  selectedRating = 0;
  isSubmitting = false;

  constructor(private ratingsService: RatingsService) {}

  rateCourse(star: number): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.selectedRating = star;

    this.ratingsService.submitRating(this.courseId, star).subscribe({
      next: (updatedCourse) => {
        this.ratingSubmitted.emit(updatedCourse);
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Failed to submit rating', err);
        this.isSubmitting = false;
      }
    });
  }
}