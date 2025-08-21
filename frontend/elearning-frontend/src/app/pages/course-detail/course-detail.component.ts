import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (data) => {
          this.course = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load course details. Please try again later.';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'Invalid course ID.';
      this.isLoading = false;
    }
  }


  enrollNow() {
    if (this.course) {
        this.courseService.createCheckoutSession(this.course.id).subscribe(session => {
            window.location.href = session.url;
        });
    }
  }
}