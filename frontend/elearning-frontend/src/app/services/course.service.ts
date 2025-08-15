import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:3000';
  private searchTerm = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable();



  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllCourses(search?: string,
    categoryId?: number | null,
    division?: string | null,
    minRating?: number | null,
    maxDuration?: number | null
) {
    let params = new HttpParams();
    if (search) params = params.append('search', search);
    if (categoryId) params = params.append('categoryId', categoryId);
    if (division) params = params.append('division', division);
    if (minRating) params = params.append('minRating', minRating);
    if (maxDuration) params = params.append('maxDuration', maxDuration);


    return this.http.get<Course[]>(`${this.apiUrl}/courses`, { params });
  }

  getCourseById(id: number) {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  createCheckoutSession(courseId: number) {
  const token = this.authService.getAccessToken(); // Assuming you inject AuthService
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  return this.http.post<any>(`${this.apiUrl}/checkout/session/${courseId}`, {}, { headers });
  }

  getCourseContent(courseId: number) {
  const token = this.authService.getAccessToken();
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  return this.http.get<any>(`${this.apiUrl}/courses/${courseId}/content`, { headers });
 }

 createCourse(courseData: any) {
  const token = this.authService.getAccessToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.post(`${this.apiUrl}/courses`, courseData, { headers });
 }

 addChapter(courseId: number, data: { title: string; order: number }) {
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(`${this.apiUrl}/courses/${courseId}/chapters`, data, { headers });
 }

  addLesson(chapterId: number, data: { title: string; order: number; videoUrl?: string }) {
      return this.http.post(`${this.apiUrl}/courses/chapters/${chapterId}/lessons`, data);
  }
    setSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

 getTopRatedCourses(division?: string | null) { // <-- Add division parameter
    let params = new HttpParams();
    if (division) params = params.append('division', division);
    return this.http.get<Course[]>(`${this.apiUrl}/courses/top-rated`, { params });
}
 
}