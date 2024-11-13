import { ClubService } from './../../../services/club.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { Club } from 'src/app/models/club-modal';
import { Evento } from 'src/app/models/event-modal';

export enum TipoEvento {
  CORRIDA_CURTA = 'Corrida curta',
  MEIO_FUNDO = 'Meio fundo',
  FUNDO = 'Fundo',
  SALTOS = 'Saltos',
  LANCAMENTOS = 'Lançamentos'
}

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.scss'],
})
export class EventoFormComponent  implements OnInit {

  novoEvento: Evento = {
    nome: '',
    tipo: '',
    clube: {
      id: undefined,
      nome: ''
    }
  };

  @Input() event: Evento | null = null;

  eventToEdit: Evento | null = null;

  tipoEventoList = Object.entries(TipoEvento).map(([value, label]) => ({ value, label }));
  clubList: Club[] = [];

  constructor(private modalController: ModalController,
    private eventService: EventService,
    private clubService: ClubService
  ) { }

  ngOnInit() {
    this.clubService.getAllClubs().subscribe(
      (response: any) => {
        this.clubList = response;
        console.log(this.clubList);
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.event) {
      this.setEventToEdit(this.event);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  setEventToEdit(event: Evento) {
    this.eventToEdit = event;
    this.novoEvento = { ...event };
    console.log(this.novoEvento);
  }

  registerEvent() {
    if (this.novoEvento.id) {
      this.eventService.updateEvent(this.novoEvento).subscribe(
        (response) => {
          console.log('Evento registrada!', response);
          this.dismiss();
        },
        (error) => {
          console.error('Erro ao registrar o evento:', error);
        }
      );
    } else {
      console.log("this.novoEvento => ", this.novoEvento);
      this.eventService.createEvent(this.novoEvento).subscribe(
        (response) => {
          console.log('Evento registrado!', response);
          this.dismiss();
        },
        (error) => {
          console.error('Erro ao registrar o evento:', error);
        }
      );
    }

  }

}
