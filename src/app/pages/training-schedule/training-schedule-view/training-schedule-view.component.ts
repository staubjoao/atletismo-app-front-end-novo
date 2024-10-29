import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrainingSessionService } from 'src/app/services/training-session.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-training-schedule-view',
  templateUrl: './training-schedule-view.component.html',
  styleUrls: ['./training-schedule-view.component.scss'],
})
export class TrainingScheduleViewComponent implements OnInit {
  @Input() trainings: any[] = [];

  userId: number = localStorage.getItem('userId')
    ? parseInt(localStorage.getItem('userId') as string)
    : 0;
  borgFeedback: { [key: number]: number | null } = {};
  additionalFeedback: { [key: number]: string } = {};
  isTREINADOR: boolean = localStorage.getItem('role') === 'TREINADOR';

  constructor(
    private modalController: ModalController,
    private trainingSessionService: TrainingSessionService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.trainings.forEach((training) => {
      this.borgFeedback[training.id] = null;
      this.additionalFeedback[training.id] = '';
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  completeTrainingSession(training: any) {
    if (this.isTREINADOR) return;

    const feedback = this.borgFeedback[training.id];
    const additionalComments = this.additionalFeedback[training.id];

    if (feedback === null || feedback < 6 || feedback > 20) {
      alert('Insira uma percepção de esforço válida (entre 6 e 20)');
      return;
    }

    const newTrainingSession = {
      date: new Date().toISOString(),
      completed: true,
      feedback: `Percepção de esforço: ${feedback}. Comentários adicionais: ${additionalComments}`,
      athleteId: this.userId,
      scheduleId: training.id,
    };

    this.trainingSessionService.create(newTrainingSession).subscribe(
      (response) => {
        alert('Atividade marcada como concluída!');
        this.dismiss();
      },
      (error) => {
        console.error('Error creating training session', error);
        alert('Um erro ocorreu ao marcar a atividade como concluída');
      }
    );
  }
}
