import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RatingModalComponent } from '../rating-modal/rating-modal.component'; 
import { RatingsService } from '../../services/ratings.service'; // 2. Import the rating service

@Component({
  selector: 'app-my-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent, RatingModalComponent],
  templateUrl: './my-course-card.component.html',
  styleUrls: ['./my-course-card.component.scss']
})
export class MyCourseCardComponent implements OnInit {
  @Input() enrollment: any;
  
  isRatingModalOpen = false;
  userRating = 0;

  constructor(private ratingsService: RatingsService) {} 

    ngOnChanges(changes: SimpleChanges): void {
    if (changes['enrollment'] && this.enrollment) {
      this.setUserRating();
    }
  }

  ngOnInit(): void {
  const courseId = this.enrollment?.course?.id;
  if (courseId) {
    this.userRating = this.ratingsService.getUserRating(courseId);

    this.ratingsService.ratingsState$.subscribe((ratings) => {
      if (ratings[courseId] !== undefined) {
        this.userRating = ratings[courseId];
      }
    });
  }
}


    private setUserRating(): void {
    const ratings = this.enrollment.course?.ratings;
    if (ratings && ratings.length > 0) {
      this.userRating = ratings[0].value;
    } else {
      this.userRating = 0; 
    }
  }

  handleRatingSubmit(ratingValue: number): void {
    const courseId = this.enrollment.course.id;
    this.ratingsService.submitRating(courseId, ratingValue).subscribe({
      next: (updatedCourse) => {
        this.userRating = ratingValue;
        this.enrollment.course.rating = updatedCourse.rating;
        this.enrollment.course.ratingCount = updatedCourse.ratingCount;
        this.isRatingModalOpen = false; 
      },
      error: (err) => console.error('Rating submission failed', err)
    });
  }
}