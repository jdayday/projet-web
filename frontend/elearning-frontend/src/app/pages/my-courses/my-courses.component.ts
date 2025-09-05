import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MyCourseCardComponent } from '../../components/my-course-card/my-course-card.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, MyCourseCardComponent],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss'
})
export class MyCoursesComponent implements OnInit {
    myEnrollments: any[] = [];
    isLoading = true;


  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
    if (params['payment'] === 'success') {
      this.cartService.clearCart();
    }
  });

    this.authService.getMyCourses().subscribe({
      next: (data) => {
        this.myEnrollments = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch enrolled courses', err);
        this.isLoading = false;
      }
    });
  }
}
