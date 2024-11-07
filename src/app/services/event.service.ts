import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Evento } from '../models/event-modal';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `${environment.apiUrl}/api/evento`;

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAllEventsByClube(clubeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clube/${clubeId}`);
  }

  getAllEventosAtleta(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/atleta`);
  }

  vincularEvento(eventoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vincular/${eventoId}`, null);
  }

  desvincularEvento(eventoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/desvincular/${eventoId}`, null);
  }

  findByTrainingScheduleId(trainingScheduleId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/findByTrainingScheduleId/${trainingScheduleId}`
    );
  }

  findByClubId(clubId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findByClubId/${clubId}`);
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${eventId}`);
  }


  createEvent(event: Evento): Observable<Evento> {
    let body = {
      nome: event.nome,
      tipo: event.tipo,
      idClube: event.clube.id
    }
    console.log(body);
    return this.http.post<Evento>(this.apiUrl, body);
  }

  updateEvent(event: Evento): Observable<Evento> {
    let body = {
      nome: event.nome,
      tipo: event.tipo,
      idClube: event.clube.id
    }
    console.log(event);
    return this.http.put<Evento>(`${this.apiUrl}/${event.id}`, body);
  }

}
