import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrainingScheduleService } from 'src/app/services/training-schedule.service';
import { EventService } from '../../../services/event.service';
import { Club } from 'src/app/models/club-modal';
import { ClubService } from 'src/app/services/club.service';
import { AuthService } from 'src/app/services/auth.service';
import { SessaoTreinoFormComponent } from '../sessao-treino-form/sessao-treino-form.component';

@Component({
  selector: 'app-sessao-treino-list',
  templateUrl: './sessao-treino-list.page.html',
  styleUrls: ['./sessao-treino-list.page.scss'],
})
export class SessaoTreinoListPage implements OnInit {
  treinos: any[] = [];
  days: number[] = [];
  monthYear: string = '';
  datetime: any;
  userRole: string = '';
  userClubId: number = 0;
  userId: number = 0;
  isTREINADOR: boolean = false

  eventId: number = 0;
  clubId: number = 0;
  events: any[] = [];
  clubs: Club[] = [];

  constructor(
    private trainingScheduleService: TrainingScheduleService,
    private eventService: EventService,
    private clubService: ClubService,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.checkUserRole();
    if(!this.isTREINADOR) {
      this.consultaEventosClubeAtleta();
    }
    this.carregarClubes();
  }

  checkUserRole() {
    const userInfo = this.authService.getUserType();
    this.isTREINADOR = userInfo === 'TREINADOR';
  }

  carregarClubes() {
    this.clubService.getAllClubs().subscribe((response) => {
      this.clubs = response;
    })
  }

  consultaEventosClubeAtleta() {
    this.eventService.getAllEventosAtleta().subscribe((response: any) => {
      this.events = response;
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

  async abrirRegistroSessaoTreinamento(treino: any) {
    if (this.isTREINADOR) {
      return;
    }

    console.log('Treino recebido:', treino);

    const modal = await this.modalController.create({
      component: SessaoTreinoFormComponent,
      componentProps: {
        treino: treino
      }
    });

    modal.onDidDismiss().then((result) => {
      this.findByEvento();
    });

    return await modal.present();
  }

}
