import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TrainingSchedule } from '../models/training-schedule-modal';

@Injectable({
  providedIn: 'root',
})
export class TrainingScheduleService {
  private apiUrl = `${environment.apiUrl}/api/treino`;

  constructor(private http: HttpClient) {}

  postTreino(treino: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, treino);
  }

  getAllTrainingSchedule(): Observable<TrainingSchedule[]> {
    return this.http.get<TrainingSchedule[]>(this.apiUrl);
  }

  findByEventId(eventId: number): Observable<TrainingSchedule[]> {
    return this.http.get<TrainingSchedule[]>(
      `${this.apiUrl}/findByEventId/${eventId}`
    );
  }

  findByClubId(clubId: number): Observable<TrainingSchedule[]> {
    return this.http.get<TrainingSchedule[]>(
      `${this.apiUrl}/findByClubId/${clubId}`
    );
  }

  findByUserId(userId: number): Observable<TrainingSchedule[]> {
    return this.http.get<TrainingSchedule[]>(
      `${this.apiUrl}/findByUserId/${userId}`
    );
  }

  createTrainingSchedule(
    trainingSchedule: TrainingSchedule
  ): Observable<TrainingSchedule> {
    return this.http.post<TrainingSchedule>(this.apiUrl, trainingSchedule);
  }

  uploadExcelFile(file: File, eventId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload/excel/${eventId}`, formData);
  }
}
