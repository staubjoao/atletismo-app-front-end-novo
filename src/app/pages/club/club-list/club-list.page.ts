import { ClubService } from './../../../services/club.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ClubFormComponent } from '../club-form/club-form.component';
import { Club } from 'src/app/models/club-modal';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit {
  clubs: any[] = [];
  userId: string = '';

  constructor(private clubService: ClubService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';

    this.findByUserId();
  }

  findByUserId() {
    this.clubService.getAllClubs().subscribe(
      (data) => {
        this.clubs = data;
        console.log(this.clubs);
      },
      (error) => {
        console.error('Erro ao obter clubes:', error);
      }
    );
  }

  async openClubRegistrationModal() {
    const modal = await this.modalController.create({
      component: ClubFormComponent
    });

    modal.onDidDismiss().then(() => {
      this.findByUserId();
    });

    return await modal.present();
  }

  async editClub(club: Club) {
    const modal = await this.modalController.create({
      component: ClubFormComponent,
      componentProps: {
        club: club
      }
    });

    modal.onDidDismiss().then(() => {
      this.findByUserId();
    });

    return await modal.present();
  }

  async deleteClub(clubId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Você tem certeza que deseja deletar este clube?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Deletar',
          handler: () => {
            this.clubService.deleteClub(clubId).subscribe((response) => {
              console.log(response);
              this.findByUserId();
            });
          }
        }
      ]
    });

    await alert.present();
  }


}
