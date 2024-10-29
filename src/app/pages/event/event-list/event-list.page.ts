import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AthleteEventService } from '../../../services/athlete-event.service';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  events: any[] = [];
  isTREINADOR: boolean = false;
  userId: number = localStorage.getItem('userId')
    ? parseInt(localStorage.getItem('userId') as string)
    : 0;
  linkedEventId: number | null = null;

  constructor(
    private eventService: EventService,
    private athleteEventService: AthleteEventService,
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadEvents();
    this.checkUserRole();
  }

  async checkUserRole() {
    const userInfo = await this.authService.getUserInfo().toPromise();
    this.isTREINADOR = userInfo ? userInfo.funcao === 'TREINADOR' : false;
    this.userId = userInfo?.id ?? 0;
    this.loadLinkedEvent();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (events) => {
        this.events = events;
      },
      (error) => {
        console.error('Erro ao carregar eventos', error);
      }
    );
  }

  async openEventRegistrationModal() {
    if (!this.isTREINADOR) {
      return;
    }

    const modal = await this.modalController.create({
      component: EventFormComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.eventService.createEvent(result.data).subscribe(
          (newEvent) => {
            this.events.push(newEvent);
          },
          (error) => {
            console.error('Erro ao criar eventos', error);
          }
        );
      }
    });

    return await modal.present();
  }

  loadLinkedEvent() {
    if (!this.isTREINADOR && this.userId) {
      this.athleteEventService.findByAthlete(this.userId).subscribe(
        (athleteEvents) => {
          if (athleteEvents.length > 0) {
            this.linkedEventId = athleteEvents[0].eventId;
          }
        },
        (error) => {
          console.error('Erro ao se vincular ao evento', error);
        }
      );
    }
  }

  isLinkedToEvent(eventId: number): boolean {
    return this.linkedEventId === eventId;
  }

  async unlinkFromEvent(event: any) {
    const alert = await this.alertController.create({
      header: 'Descvincular do evento',
      message: `Você quer se desvincular do evento "${event.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Desvincular',
          handler: () => {
            this.athleteEventService.findByAthlete(this.userId).subscribe(
              (athleteEvents) => {
                if (athleteEvents.length > 0) {
                  this.athleteEventService
                    .deleteAthleteEvent(athleteEvents[0].id)
                    .subscribe(
                      () => {
                        console.log('Successfully unlinked from event');
                        this.linkedEventId = null;
                      },
                      (error) => {
                        console.error('Error unlinking from event', error);
                      }
                    );
                }
              },
              (error) => {
                console.error('Error finding athlete event', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async linkToEvent(event: any) {
    if (this.isTREINADOR || this.linkedEventId) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Vincular-se ao evento',
      message: `Você quer se vincular ao evento "${event.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Vincular',
          handler: () => {
            const dto = {
              athleteId: this.userId,
              eventId: event.id,
            };
            this.athleteEventService.createAthleteEvent(dto).subscribe(
              () => {
                console.log('Successfully linked to event');
                this.linkedEventId = event.id;
              },
              (error) => {
                console.error('Error linking to event', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }
}
