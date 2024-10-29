// {
//   "date": "2022-10-10T10:00:00Z",
//   "completed": true,
//   "feedback": "Feedback",
//   "athleteId": 1,
//   "scheduleId": 1
// }

export interface TrainingSession {
  id?: number;
  date: string;
  completed: boolean;
  feedback: string;
  athleteId: number;
  scheduleId: number;
}
