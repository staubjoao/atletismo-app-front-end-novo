import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrainingSchedule } from 'src/app/models/training-schedule-modal';
import { TrainingScheduleService } from 'src/app/services/training-schedule.service';
import { TrainingScheduleViewComponent } from '../training-schedule-view/training-schedule-view.component';
import { TrainingScheduleFormComponent } from '../training-schedule-form/training-schedule-form.component';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-training-schedule-list',
  templateUrl: './training-schedule-list.page.html',
  styleUrls: ['./training-schedule-list.page.scss'],
})
export class TrainingScheduleListPage implements OnInit {
  trainingSchedules: TrainingSchedule[] = [];
  days: number[] = [];
  monthYear: string = '';
  datetime: any;
  userRole: string = '';
  userClubId: number = 0;
  userId: number = 0;
  constructor(
    private trainingScheduleService: TrainingScheduleService,
    private eventService: EventService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('role') || ''; // Retrieve user role from local storage
    this.userClubId = Number(localStorage.getItem('clubId')) || 0; // Retrieve club ID from local storage
    this.userId = Number(localStorage.getItem('userId')) || 0; // Retrieve user ID from local storage
    console.log('userRole', this.userRole);
    if (this.userRole === 'TREINADOR') {
      this.findByClubId();
    } else {
      this.findByUserId();
    }

    this.loadDays();
  }

  findByClubId() {
    this.trainingScheduleService.findByClubId(this.userClubId).subscribe(
      (data) => {
        this.trainingSchedules = data;
        console.log('aaa', this.trainingSchedules);
      },
      (error) => {
        console.error('Erro ao obter treinos pelo clube:', error);
      }
    );
  }

  findByUserId() {
    this.trainingScheduleService.findByUserId(this.userId).subscribe(
      (data) => {
        this.trainingSchedules = data;
        console.log('aaa', this.trainingSchedules);
      },
      (error) => {
        console.error('Erro ao obter treinos pelo evento:', error);
      }
    );
  }

  loadDays() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayOfNextMonth = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth() + 1,
      0
    );

    this.monthYear = `${nextMonth.toLocaleString('default', {
      month: 'long',
    })} ${nextMonth.getFullYear()}`;

    for (let day = 1; day <= lastDayOfNextMonth.getDate(); day++) {
      this.days.push(day);
    }
  }

  async openTrainingSchedulesRegistrationModal() {
    const modal = await this.modalController.create({
      component: TrainingScheduleFormComponent,
    });

    modal.onDidDismiss().then(() => {
      if (this.userRole === 'TREINADOR') {
        this.findByClubId();
      } else {
        this.findByUserId();
      }
    });

    return await modal.present();
  }

  async showTraining() {
    const selectedDateISO = new Date(this.datetime).toISOString().split('T')[0];
    const selectedTrainings = this.trainingSchedules.filter(
      (training) => training.startTime.split('T')[0] === selectedDateISO
    );
    let events = [];
    for (let training of selectedTrainings as any) {
      const event = await this.eventService
        .findByTrainingScheduleId(training.id)
        .toPromise();
      training.eventName = event.name;
      training.eventType = event.type;
      events.push(event);
    }
    console.log('selectedTrainings', selectedTrainings);

    if (selectedTrainings.length > 0) {
      const modal = await this.modalController.create({
        component: TrainingScheduleViewComponent,
        componentProps: {
          trainings: selectedTrainings,
        },
      });
      return await modal.present();
    } else {
      console.log('Nenhum treino encontrado para a data selecionada.');
    }
  }
}
