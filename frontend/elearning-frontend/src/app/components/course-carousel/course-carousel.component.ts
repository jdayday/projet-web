import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-course-carousel',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-carousel.component.html',
  styleUrls: ['./course-carousel.component.scss']
})
export class CourseCarouselComponent implements OnChanges {
  @Input() title = '';
  @Input() courses: Course[] = [];

  displayCourses: Course[] = [];
  
  currentIndex = 0;
  cardsPerView = 4;
  cardWidth = 250; 
  gapWidth = 24;   
  slideWidth = this.cardWidth + this.gapWidth;
  transitioning = false;
  isCarousel = false;


   ngOnChanges(changes: SimpleChanges): void {
    if (changes['courses']) {
      this.setupCarousel();
    }
  }

  setupCarousel(): void {
    if (!this.courses || this.courses.length === 0) {
      this.displayCourses = [];
      this.isCarousel = false;
      return;
    }
    
    if (this.courses.length < this.cardsPerView) {
      this.displayCourses = this.courses;
      this.isCarousel = false;
    } else {
      this.isCarousel = true;
      this.displayCourses = [
        ...this.courses.slice(-this.cardsPerView), 
        ...this.courses, 
        ...this.courses.slice(0, this.cardsPerView)
      ];
      this.currentIndex = this.cardsPerView;
    }
  }


  nextSlide() {
    if (!this.isCarousel ||this.transitioning) return;
    this.currentIndex++;
    
    if (this.currentIndex === this.courses.length + this.cardsPerView) {
      this.transitioning = true;
      setTimeout(() => {
        this.currentIndex = this.cardsPerView; 
        this.transitioning = false;
      }, 500);
    }
  }

  prevSlide() {
    if (!this.isCarousel || this.transitioning) return;
    this.currentIndex--;

    if (this.currentIndex < this.cardsPerView) {
      this.transitioning = true;
      setTimeout(() => {
        this.currentIndex = this.courses.length + this.cardsPerView - 1;
        this.transitioning = false;
      }, 500);
    }
  }
}