import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Club } from 'src/app/models/club-modal';
import { ClubService } from 'src/app/services/club.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss'],
})
export class ClubFormComponent implements OnInit {
  newClub: Club = { nome: '' };
  userInfo: any = { clubId: null };

  constructor(
    private modalController: ModalController,
    private clubService: ClubService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.loadUserInfo();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  loadUserInfo() {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      this.authService.getUserByEmail(userEmail).subscribe(
        (info: any) => {
          this.userInfo = {
            ...info,
          };
          console.log('User info loaded:', this.userInfo);
        },
        (error) => {
          console.error('Error loading user info:', error);
        }
      );
    }
  }

  registerClub() {
    this.clubService.createClub(this.newClub).subscribe(
      (response) => {
        console.log('Club registered!', response);
        const clubId = response.id;
        this.dismiss();
        this.router.navigate(['/club-list']);
      },
      (error) => {
        console.error('Error registering club:', error);
      }
    );
  }

}
