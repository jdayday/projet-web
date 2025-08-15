import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllCategories(division?: string| null) { 
      let params = new HttpParams();
      if (division) params = params.append('division', division);

      return this.http.get<any[]>(`${this.apiUrl}/categories`, { params });
  }

}