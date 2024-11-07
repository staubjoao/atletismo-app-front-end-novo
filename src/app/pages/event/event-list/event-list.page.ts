import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { EventFormComponent } from '../event-form/event-form.component';
import { Evento } from 'src/app/models/event-modal';

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

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.checkUserRole();
    if (this.isTREINADOR) {
      this.loadEvents();
    } else {
      this.loadEventosAtleta();
    }
  }

  checkUserRole() {
    const userInfo = this.authService.getUserType();
    this.isTREINADOR = userInfo === 'TREINADOR';
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (events) => {
        this.events = events;
        console.log(this.events);
      },
      (error) => {
        console.error('Erro ao carregar eventos', error);
      }
    );
  }

  loadEventosAtleta() {
    this.eventService.getAllEventosAtleta().subscribe(
      (events) => {
        this.events = events;
        console.log(this.events);
      },
      (error) => {
        console.error('Erro ao carregar eventos', error);
      }
    );
  }


  async editEvent(event: Evento) {
    const modal = await this.modalController.create({
      component: EventFormComponent,
      componentProps: {
        event: event
      }
    });

    modal.onDidDismiss().then(() => {
      this.loadEvents();
    });

    return await modal.present();
  }

  async deleteEvent(eventId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Você tem certeza que deseja deletar esta modalidade?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Deletar',
          handler: () => {
            this.eventService.deleteEvent(eventId).subscribe((response) => {
              console.log(response);
              this.loadEvents();
            });
          }
        }
      ]
    });
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

    modal.onDidDismiss().then(() => {
      this.loadEvents();
    });

    return await modal.present();
  }

  async desvincularNoEvento(evento: any) {
    if (this.isTREINADOR) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Desvincular do evento',
      message: `Você quer se desvincular do evento "${evento.nome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Desvincular',
          handler: () => {
            this.eventService.desvincularEvento(evento.id).subscribe(
              () => {
                console.log('Successfully');
                this.loadEventosAtleta();
                this.showToast('Desvinculação realizada com sucesso!', 'success');
              },
              (error) => {
                console.error('Error', error);
                this.showToast('Erro ao desvincular do evento.', 'danger');
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async vincularNoEvento(evento: any) {
    if (this.isTREINADOR) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Vincular-se ao evento',
      message: `Você quer se vincular ao evento "${evento.nome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Vincular',
          handler: () => {
            this.eventService.vincularEvento(evento.id).subscribe(
              () => {
                console.log('Successfully linked to event');
                this.loadEventosAtleta();
                this.showToast('Vinculação realizada com sucesso!', 'success');
              },
              (error) => {
                console.error('Error linking to event', error);
                this.showToast('Erro ao vincular ao evento.', 'danger');
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }
}
