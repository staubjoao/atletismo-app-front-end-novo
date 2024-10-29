import { ClubService } from './../../../services/club.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Event } from 'src/app/models/event-modal';
import { Club } from 'src/app/models/club-modal';
import { TrainingScheduleService } from 'src/app/services/training-schedule.service';
import { TrainingSchedule } from 'src/app/models/training-schedule-modal';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './training-schedule-form.component.html',
  styleUrls: ['./training-schedule-form.component.scss'],
})
export class TrainingScheduleFormComponent  implements OnInit {

  newTrainingSchedule: TrainingSchedule = {
    dayOfWeek: 0,
    startTime: '',
    description: '',
    eventId: 0
  };

  eventList: Event[] = [];

  constructor(private modalController: ModalController,
    private trainingScheduleService: TrainingScheduleService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(
      (response: any) => {
        this.eventList = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  dismiss() {
    this.modalController.dismiss();
  }

  registerEvent() {
    console.log(this.newTrainingSchedule);
    this.trainingScheduleService.createTrainingSchedule(this.newTrainingSchedule).subscribe(
      (response) => {
        console.log('Registro de treino registrado!', response);
        this.dismiss();
      },
      (error) => {
        console.error('Erro ao registrar o treino:', error);
      }
    );
  }

}
