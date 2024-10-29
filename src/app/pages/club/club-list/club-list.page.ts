import { ClubService } from './../../../services/club.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClubFormComponent } from '../club-form/club-form.component';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.page.html',
  styleUrls: ['./club-list.page.scss'],
})
export class ClubListPage implements OnInit {
  clubs: any[] = [];
  userId: string = '';

  constructor(private clubService: ClubService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';

    this.findByClubId();
  }

  findByClubId() {
    if(this.userId !== '') {    
      this.clubService.getByUserId(this.userId).subscribe(
        (data) => {
          this.clubs = data;
          console.log(this.clubs);
        },
        (error) => {
          console.error('Erro ao obter clubes:', error);
        }
      );
    }
  }

  async openClubRegistrationModal() {
    const modal = await this.modalController.create({
      component: ClubFormComponent
    });

    modal.onDidDismiss().then(() => {
      this.findByClubId();
    });

    return await modal.present();
  }

}
