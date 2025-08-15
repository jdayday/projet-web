import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.scss'
})
export class MyCoursesComponent implements OnInit {
    myEnrollments: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getMyCourses().subscribe(data => {
      this.myEnrollments = data;
    });
  }
}
