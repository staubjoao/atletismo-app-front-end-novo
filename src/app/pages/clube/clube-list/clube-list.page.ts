import { ClubService } from './../../../services/club.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Club } from 'src/app/models/club-modal';
import { AuthService } from 'src/app/services/auth.service';
import { ClubeFormEntrarComponent } from '../clube-form-entrar/clube-form-entrar.component';
import { ClubeFormComponent } from '../clube-form/clube-form.component';

@Component({
  selector: 'app-clube-list',
  templateUrl: './clube-list.page.html',
  styleUrls: ['./clube-list.page.scss'],
})
export class ClubeListPage implements OnInit {
  clubs: any[] = [];
  userId: string = '';
  isTREINADOR: boolean = false

  constructor(private clubService: ClubService,
    private modalController: ModalController,
    private alertController: AlertController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';

    this.findByUserId();
    this.checkUserRole();
  }

  checkUserRole() {
    const userInfo = this.authService.getUserType();
    this.isTREINADOR = userInfo === 'TREINADOR';
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
      component: ClubeFormComponent
    });

    modal.onDidDismiss().then(() => {
      this.findByUserId();
    });

    return await modal.present();
  }

  async entrarClubeModal() {
    const modal = await this.modalController.create({
      component: ClubeFormEntrarComponent
    });

    modal.onDidDismiss().then(() => {
      this.findByUserId();
    });

    return await modal.present();
  }

  async editClub(club: Club) {
    const modal = await this.modalController.create({
      component: ClubeFormComponent,
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
