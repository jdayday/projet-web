import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = 'http://localhost:3000';
  private searchTerm = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable();



  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllCourses(options?: {
    search?: string;
    categoryId?: number | null;
    division?: string | null;
    minRating?: number | null;
    minDuration?: number | null;   
    maxDuration?: number | null;
    sort?: string | null;
  }) {
    let params = new HttpParams();

    if (options?.search != null && options.search !== '') {
      params = params.set('search', options.search);
    }
    if (options?.categoryId != null) {
      params = params.set('categoryId', options.categoryId.toString());
    }
    if (options?.division != null) {
      params = params.set('division', options.division);
    }
    if (options?.minRating != null) {
      params = params.set('minRating', options.minRating.toString());
    }
    if (options?.minDuration != null) {
      params = params.set('minDuration', options.minDuration.toString());
    }
    if (options?.maxDuration != null) {
      params = params.set('maxDuration', options.maxDuration.toString());
    }
    if (options?.sort != null) {
      params = params.set('sort', options.sort);
    }

    return this.http.get<Course[]>(`${this.apiUrl}/courses`, { params });
  }



  getCourseById(id: number) {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  createCheckoutSession(courseId: number) {
  const token = this.authService.getAccessToken(); 
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

 getTopRatedCourses(division?: string | null) { 
    let params = new HttpParams();
    if (division) params = params.append('division', division);
    return this.http.get<Course[]>(`${this.apiUrl}/courses/top-rated`, { params });
 }
 getMyCreatedCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/my-creations`);
  }

  markLessonAsComplete(lessonId: number): Observable<{ progress: number }> {
  return this.http.post<{ progress: number }>(`${this.apiUrl}/lessons/${lessonId}/complete`, {});
 } 
}