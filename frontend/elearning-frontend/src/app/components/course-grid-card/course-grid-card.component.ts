import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-grid-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-grid-card.component.html',
  styleUrls: ['./course-grid-card.component.scss']
})
export class CourseGridCardComponent {
  @Input() course!: Course;
}