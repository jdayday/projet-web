import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'; 
import { Course } from '../../../models/course.model';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../course-card/course-card.component';

@Component({
  selector: 'app-top-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './top-courses.component.html',
  styleUrls: ['./top-courses.component.scss']
})
export class TopCoursesComponent implements OnInit, OnChanges {
  @Input() courses: Course[] = [];
  
  displayCourses: Course[] = [];
  currentIndex = 0;
  cardsPerView = 4;
  cardWidth = 250; 
  gapWidth = 24;   
  slideWidth = this.cardWidth + this.gapWidth;
  transitioning = false;
  isCarousel = false;

  constructor() {}

  ngOnInit(): void {
  }
  

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