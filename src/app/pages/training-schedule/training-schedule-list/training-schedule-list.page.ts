import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrainingSchedule } from 'src/app/models/training-schedule-modal';
import { TrainingScheduleService } from 'src/app/services/training-schedule.service';
import { TrainingScheduleViewComponent } from '../training-schedule-view/training-schedule-view.component';
import { TrainingScheduleFormComponent } from '../training-schedule-form/training-schedule-form.component';
import { EventService } from '../../../services/event.service';
import { Club } from 'src/app/models/club-modal';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-training-schedule-list',
  templateUrl: './training-schedule-list.page.html',
  styleUrls: ['./training-schedule-list.page.scss'],
})
export class TrainingScheduleListPage implements OnInit {
  treinos: any[] = [];
  days: number[] = [];
  monthYear: string = '';
  datetime: any;
  userRole: string = '';
  userClubId: number = 0;
  userId: number = 0;

  eventId: number = 0;
  clubId: number = 0;
  events: any[] = [];
  clubs: Club[] = [];


  constructor(
    private trainingScheduleService: TrainingScheduleService,
    private eventService: EventService,
    private clubService: ClubService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.carregarClubes();
  }

  carregarClubes() {
    this.clubService.getAllClubs().subscribe((response) => {
      this.clubs = response;
    })
  }

  consultaEventosClube() {
    this.eventService.getAllEventsByClube(this.clubId).subscribe((response) => {
      this.events = response;
    })
  }

  findByClubId() {
    this.trainingScheduleService.getAllTrainingSchedule().subscribe(
      (data) => {
        this.treinos = data;
        console.log('aaa', this.treinos);
      },
      (error) => {
        console.error('Erro ao obter treinos pelo clube:', error);
      }
    );
  }

  findByEvento() {
    this.treinos = [];
    this.trainingScheduleService.findByEvento(this.eventId).subscribe(
      (data) => {
        this.treinos = data;
        console.log(this.treinos);
      },
      (error) => {
        console.error('Erro ao obter treinos pelo evento:', error);
      }
    );
  }

  obterDiaSemana(diaSemana: number): string {
    const diasSemanaMap: { [key: number]: string } = {
      1: 'segunda-feira',
      2: 'terça-feira',
      3: 'quarta-feira',
      4: 'quinta-feira',
      5: 'sexta-feira',
      6: 'sábado',
      7: 'domingo'
    };

    return diasSemanaMap[diaSemana] || 'Dia inválido';
  }

}
