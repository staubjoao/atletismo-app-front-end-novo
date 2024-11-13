import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingSession } from '../models/training-session.model'; // Adjust the import according to your project structure

@Injectable({
  providedIn: 'root',
})
export class TrainingSessionService {
  private apiUrl = `${environment.apiUrl}/api/sessao-treino`;

  constructor(private http: HttpClient) {}

  salvar(body: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, body);
  }

  findAll(): Observable<TrainingSession[]> {
    return this.http.get<TrainingSession[]>(this.apiUrl);
  }

  findOne(id: number): Observable<TrainingSession> {
    return this.http.get<TrainingSession>(`${this.apiUrl}/${id}`);
  }

  getByAthleteId(athleteId: number): Observable<TrainingSession[]> {
    return this.http.get<TrainingSession[]>(
      `${this.apiUrl}/athlete/${athleteId}`
    );
  }

  getByScheduleId(scheduleId: number): Observable<TrainingSession[]> {
    return this.http.get<TrainingSession[]>(
      `${this.apiUrl}/schedule/${scheduleId}`
    );
  }

  getByAthleteIdAndScheduleId(
    athleteId: number,
    scheduleId: number
  ): Observable<TrainingSession[]> {
    return this.http.get<TrainingSession[]>(
      `${this.apiUrl}/athlete/${athleteId}/schedule/${scheduleId}`
    );
  }

  create(
    createTrainingSessionDto: TrainingSession
  ): Observable<TrainingSession> {
    return this.http.post<TrainingSession>(
      this.apiUrl,
      createTrainingSessionDto
    );
  }

  update(
    id: number,
    updateTrainingSessionDto: TrainingSession
  ): Observable<TrainingSession> {
    return this.http.patch<TrainingSession>(
      `${this.apiUrl}/${id}`,
      updateTrainingSessionDto
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
