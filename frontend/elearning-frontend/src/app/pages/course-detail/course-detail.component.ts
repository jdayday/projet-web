import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe(data => {
        this.course = data;
      });
    }
  }

  buyCourse() {
    if (this.course) {
        this.courseService.createCheckoutSession(this.course.id).subscribe(session => {
            // Redirect the user to the Stripe payment page
            window.location.href = session.url;
        });
    }
  }
}