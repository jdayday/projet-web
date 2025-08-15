import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  getDashboardStats() {
    return this.http.get<any>(`${this.apiUrl}/admin/stats`);
 }

 deleteUser(userId: number) {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
 }
}