import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  private apiUrl = 'http://localhost:3000/ratings';

  private ratingsState = new BehaviorSubject<{ [courseId: number]: number }>({});
  ratingsState$ = this.ratingsState.asObservable();


  constructor(private http: HttpClient) { 
    this.loadRatingsFromBackend();

  }

  submitRating(courseId: number, value: number): Observable<Course> {
    const body = { courseId, value };
    return this.http.post<Course>(this.apiUrl, body).pipe(
        tap(() => {
        const current = this.ratingsState.value;
        this.ratingsState.next({
          ...current,
          [courseId]: value
        });
      })
    );
  }

    getUserRating(courseId: number): number {
    return this.ratingsState.value[courseId] ?? 0;
  }

    private loadRatingsFromBackend(): void {
    this.http.get<{ courseId: number, value: number }[]>(`${this.apiUrl}/my-ratings`)
      .subscribe(ratingsArray => {
        const ratingsObj: { [key: number]: number } = {};
        ratingsArray.forEach(r => ratingsObj[r.courseId] = r.value);
        this.ratingsState.next(ratingsObj);
      }, err => console.error('Failed to load ratings', err));
  }

}