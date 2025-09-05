import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
import { ProfileService } from './profile.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromToken());

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserRole = new BehaviorSubject<string | null>(this.getRoleFromToken());
  userRole$ = this.currentUserRole.asObservable();
  currentUser$ = this.userSubject.asObservable();

  

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private profileService: ProfileService) {}

  public getCurrentUserId(): number | null {
    const user = this.userSubject.getValue();
    return user ? user.id : null;
  }


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

 login(credentials: any): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/auth/local/signin`, credentials).pipe(
      tap((response) => {
        this.saveTokens(response);
        this.loggedIn.next(true);
      }),
      switchMap(() => this.profileService.getProfile()),
      tap((user: User) => {
        this.userSubject.next(user);
        this.currentUserRole.next(user.role);
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
    this.userSubject.next(null);

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
  private getUserFromToken(): User | null {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      return {
        id: decodedToken.sub,
        email: decodedToken.email,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        role: decodedToken.role,
        avatarUrl: decodedToken.avatarUrl || '', 
      } as User;
    } catch (error) {
      return null;
    }
  }

    public updateUser(updatedUserInfo: Partial<User>,newAccessToken?: string): void {
    const currentUser = this.userSubject.getValue();
    if (currentUser) {
      const newUser = { ...currentUser, ...updatedUserInfo };
      this.userSubject.next(newUser);
    }

    if (newAccessToken) {
        localStorage.setItem('access_token', newAccessToken);
      }
  }

}