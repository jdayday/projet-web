import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  private apiUrl = 'http://localhost:3000/ratings';

  constructor(private http: HttpClient) { }

  submitRating(courseId: number, value: number): Observable<Course> {
    const body = { courseId, value };
    return this.http.post<Course>(this.apiUrl, body);
  }
}