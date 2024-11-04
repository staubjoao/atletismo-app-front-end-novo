import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/usuario`;

  constructor(private http: HttpClient) {}

  getAllUserByClube(clubCod: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clube/${clubCod}`);
  }
}
