import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingScheduleService {
  private apiUrl = `${environment.apiUrl}/api/treino`;

  constructor(private http: HttpClient) {}

  postTreino(treino: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, treino);
  }

  getAllTrainingSchedule(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  findByEvento(eventoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/evento/${eventoId}`);
  }

}
