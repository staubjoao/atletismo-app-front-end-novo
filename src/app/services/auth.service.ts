import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<{ email: string; role: string } | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,
    private router: Router
  ) {}

  private getUserFromStorage() {
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    return email && role ? { email, role } : null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
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
    return this.http.get<any>(url);
  }

  getUserInfo(): Observable<User> {
    const email = localStorage.getItem('email') as string;
    return this.getUserByEmail(email);
  }

  getUserType(): string {
    return localStorage.getItem('role') || '';
  }

  loginUser(user: any): Observable<any> {
    return this.login(user).pipe((response: any) => {
      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
        this.currentUserSubject.next({ email: response.email, role: response.role });
      }
      return response;
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('clubId');
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
  }

  removeUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  getUsersByClubId(clubId: string, page: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getUsersByClubId/${clubId}?page=${page}&pageSize=${pageSize}`);
  }
}
