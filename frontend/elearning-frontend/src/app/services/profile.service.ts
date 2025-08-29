import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


export interface AvatarUploadResponse {
  avatarUrl: string;
  accessToken: string;
}

export interface ProfileUpdateResponse {
  user: User;
  accessToken: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

    updateProfile(data: Partial<User>): Observable<ProfileUpdateResponse> {
    return this.http.patch<ProfileUpdateResponse>(`${this.apiUrl}/me`, data);
  }

    uploadAvatar(file: File): Observable<AvatarUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<AvatarUploadResponse>(`${this.apiUrl}/avatar`, formData);
  }

}