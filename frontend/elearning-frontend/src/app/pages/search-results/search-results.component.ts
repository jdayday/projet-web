import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  courses: Course[] = [];
  searchTerm: string | null = '';
  selectedSort: string = 'relevant';


  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public authService: AuthService 
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('q');
      this.loadResults();
    });
  }

  onSortChange() {
    this.loadResults();
  }


  loadResults(): void {
    if (this.searchTerm) {
      this.courseService.getAllCourses({
        search: this.searchTerm,
        sort: this.selectedSort
      }).subscribe(data => {
        this.courses = data;
      });
    }
  }
}