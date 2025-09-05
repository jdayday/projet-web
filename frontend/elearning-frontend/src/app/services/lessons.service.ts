import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../models/course.model'; // We can reuse the Lesson model

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  // Make sure this URL matches your NestJS backend's URL for lessons
  private apiUrl = 'http://localhost:3000/lessons'; 

  constructor(private http: HttpClient) { }

  /**
   * Toggles the completion status of a lesson.
   * @param lessonId The ID of the lesson to update.
   * @param completed The new completion status.
   * @returns An Observable with the updated lesson data.
   */
  toggleLessonCompletion(lessonId: number, completed: boolean): Observable<Lesson> {
    return this.http.patch<Lesson>(`${this.apiUrl}/${lessonId}/complete`, { completed });
  }
}