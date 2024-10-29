import { ClubService } from './../../../services/club.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event-modal';
import { Club } from 'src/app/models/club-modal';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent  implements OnInit {

  newEvent: any = {
    name: '',
    type: '',
    clubId: 0
  };

  clubList: Club[] = [];

  constructor(private modalController: ModalController,
    private eventService: EventService,
    private clubService: ClubService
  ) { }

  ngOnInit() {
    this.clubService.getAllClubs().subscribe(
      (response: any) => {
        this.clubList = response;
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
    console.log(this.newEvent);
    this.eventService.createEvent(this.newEvent).subscribe(
      (response) => {
        console.log('Grupo registrado!', response);
        this.dismiss();
      },
      (error) => {
        console.error('Erro ao registrar clube:', error);
      }
    );
  }

}
