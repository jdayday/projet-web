import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: any; 
  isLoading = true;
  error: string | null = null;
  isInCart = false; 
  enrollment: any = null; 
  
  

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (data) => {
          this.course = data;
          this.isLoading = false;
          this.isInCart = this.cartService.isCourseInCart(this.course.id);

        },
        error: (err) => {
          this.error = 'Failed to load course details. Please try again later.';
          this.isLoading = false;
          console.error(err);
        }
      });

            this.courseService.checkEnrollment(courseId).subscribe({
        next: (response) => {
          this.enrollment = response;
        },
        error: (err) => {
          this.enrollment = null;
          console.error('Failed to check enrollment status', err);
        }
      });

    } else {
      this.error = 'Invalid course ID.';
      this.isLoading = false;
    }

      if (this.course) {
      this.isInCart = this.cartService.isCourseInCart(this.course.id);
    }

  }


  enrollNow() {
    if (this.course) {
        this.courseService.createCheckoutSession(this.course.id).subscribe(session => {
            window.location.href = session.url;
        });
    }
  }

    addToCart(): void {
    if (this.course) {
      this.cartService.addToCart(this.course);
      this.isInCart = true;
    }
  }

}