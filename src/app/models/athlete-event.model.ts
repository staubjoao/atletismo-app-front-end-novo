export interface CreateAthleteEventDto {
  athleteId: number;
  eventId: number;
}

export interface AthleteEvent {
  id: number;
  athleteId: number;
  eventId: number;
}
