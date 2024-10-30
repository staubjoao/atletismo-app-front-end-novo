import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Club } from '../models/club-modal';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private apiUrl = `${environment.apiUrl}/api/clube`;

  constructor(private http: HttpClient) {}

  getAllClubs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getByUserId(userId: string): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }

  getClubById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createClub(club: Club): Observable<any> {
    return this.http.post<Club>(this.apiUrl, club);
  }

  getClubByCode(code: string): Observable<any> {
    if (code === '') {
      return new Observable();
    }
    const url = `${this.apiUrl}/findByCode/${code}`;
    return this.http.get<any>(url);
  }
}
