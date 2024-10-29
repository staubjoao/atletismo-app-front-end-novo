import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  AthleteEvent,
  CreateAthleteEventDto,
} from '../models/athlete-event.model';

@Injectable({
  providedIn: 'root',
})
export class AthleteEventService {
  private apiUrl = `${environment.apiUrl}/athlete-event`;

  constructor(private http: HttpClient) {}

  createAthleteEvent(dto: CreateAthleteEventDto): Observable<AthleteEvent> {
    return this.http.post<AthleteEvent>(this.apiUrl, dto);
  }

  deleteAthleteEvent(id: number): Observable<AthleteEvent> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<AthleteEvent>(url);
  }

  findByAthlete(athleteId: number): Observable<AthleteEvent[]> {
    const url = `${this.apiUrl}/findByAthlete/${athleteId}`;
    return this.http.get<AthleteEvent[]>(url);
  }

  findByEvent(eventId: number): Observable<AthleteEvent[]> {
    const url = `${this.apiUrl}/findByEvent/${eventId}`;
    return this.http.get<AthleteEvent[]>(url);
  }
}
