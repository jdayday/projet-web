import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTestimonials() {
    return this.http.get<any[]>(`${this.apiUrl}/testimonials`);
  }
}