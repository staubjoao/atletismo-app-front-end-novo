import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  createUser(user: User): Observable<any> {
    return this.http.post<User>(this.apiUrl, user);
  }

  createUserWithClub(user: User, clubCode: string): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/clube/${clubCode}`, user);
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/${user.email}`;
    return this.http.patch<User>(url, user);
  }

  login(user: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<User>(url, user);
  }
  getUserByEmail(email: string): Observable<any> {
    if (email === '') {
      return new Observable();
    }
    const url = `${this.apiUrl}/findByEmail/${email}`;
    console.log('aa');
    return this.http.get<any>(url);
  }

  getUserInfo(): Observable<User> {
    const email = localStorage.getItem('email') as any;
    return this.getUserByEmail(email);
  }

  getUserType(): string {
    const role = localStorage.getItem('role') as any;
    return role;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('clubId');
  }

  removeUser(id: number): Observable<any> {
    console.log('id', id);
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  getUsersByClubId(
    clubId: string,
    page: number,
    pageSize: number
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/getUsersByClubId/${clubId}?page=${page}&pageSize=${pageSize}`
    );
  }
}
