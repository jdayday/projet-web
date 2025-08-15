import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
    });
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }
    this.courseService.createCourse(this.courseForm.value).subscribe(() => {
      // Navigate to the main courses page after creation
      this.router.navigate(['/courses']);
    });
  }
}