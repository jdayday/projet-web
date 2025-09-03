import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MyCourseCardComponent } from '../../components/my-course-card/my-course-card.component';

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


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
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
