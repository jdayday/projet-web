import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(division?: string| null) { 
      let params = new HttpParams();
      if (division) params = params.append('division', division);

      return this.http.get<any[]>(`${this.apiUrl}`, { params });
  }

  getTopCategories(division?: string | null): Observable<any[]> {
    let params = new HttpParams();
    if (division) params = params.append('division', division);

    return this.http.get<any[]>(`${this.apiUrl}/top`, { params });
  }

}