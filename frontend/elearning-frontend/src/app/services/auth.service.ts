import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  
  
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserRole = new BehaviorSubject<string | null>(this.getRoleFromToken());
  userRole$ = this.currentUserRole.asObservable();
  

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

    private getRoleFromToken(): string | null {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role;
    }
    return null;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  login(credentials: any) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/local/signin`, credentials)
      .pipe(
        tap((response) => {
          this.saveTokens(response);
          this.loggedIn.next(true);
          this.currentUserRole.next(this.getRoleFromToken()); 
        })
      );
  }

  private saveTokens(tokens: { access_token: string }) {
    localStorage.setItem('access_token', tokens.access_token);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
    this.currentUserRole.next(null);
  }

    signup(credentials: any) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/local/signup`, credentials)
      .pipe(
        tap((response) => {
          this.saveTokens(response);
          this.loggedIn.next(true);
          this.currentUserRole.next(this.getRoleFromToken());
        })
      );
  }
  getMyCourses() {
  return this.http.get<any[]>(`${this.apiUrl}/courses/me/my-courses`);
  }
}