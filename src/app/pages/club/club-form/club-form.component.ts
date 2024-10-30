import { Component, OnInit, Input } from '@angular/core';
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

  @Input() club: Club | null = null;


  clubToEdit: Club | null = null;

  constructor(
    private modalController: ModalController,
    private clubService: ClubService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // Carregar informações do usuário (se necessário)
    // this.loadUserInfo();

    // Se o clube foi passado como propriedade, inicialize
    if (this.club) {
      this.setClubToEdit(this.club);
    }
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
    if (this.clubToEdit) {
      this.clubService.updateClub(this.clubToEdit.id!, this.newClub).subscribe(
        (response) => {
          console.log('Club updated!', response);
          this.dismiss();
          this.router.navigate(['/club-list']);
        },
        (error) => {
          console.error('Error updating club:', error);
        }
      );
    } else {
      this.clubService.createClub(this.newClub).subscribe(
        (response) => {
          console.log('Club registered!', response);
          this.dismiss();
          this.router.navigate(['/club-list']);
        },
        (error) => {
          console.error('Error registering club:', error);
        }
      );
    }
  }

  setClubToEdit(club: Club) {
    this.clubToEdit = club;
    this.newClub = { ...club };
  }
}
