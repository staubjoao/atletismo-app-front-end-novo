import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user-model';
import { ClubService } from 'src/app/services/club.service';
import { ViewUsersComponent } from '../view-users/view-users.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {
  users: User[] = [];
  isTREINADOR: boolean = false;
  clubId: string = '';
  clubName: string = '';
  currentPage: number = 1;
  pageSize: number = 20;
  searchEmail: string = '';
  searchedUser: User | null = null;
  clubs: any[] = [];

  constructor(
    private authService: AuthService,
    private clubService: ClubService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.findByUserId();
    this.checkUserRole();
  }

  async checkUserRole() {
    const userInfo = await this.authService.getUserType();
    this.isTREINADOR = userInfo === 'TREINADOR';
  }

  findByUserId() {
    this.clubService.getByUserId().subscribe(
      (data) => {
        this.clubs = data;
        console.log(this.clubs);
      },
      (error) => {
        console.error('Erro ao obter clubes:', error);
      }
    );
  }

  async viewUsers(clube: any) {
    const modal = await this.modalController.create({
      component: ViewUsersComponent,
      componentProps: {
        clubCod: clube.codigo
      }
    });

    return await modal.present();
  }

  loadClubName() {
    if (!this.clubId) {
      return;
    }
    this.clubService.getClubById(this.clubId).subscribe(
      (club) => {
        this.clubName = club.name;
      },
      (error) => {
        console.error('Erro ao carregar nome do clube', error);
      }
    );
  }

  async removeUserFromClub(user: User) {
    console.log('Removendo usuário do clube:', user);
    const alert = await this.alertController.create({
      header: 'Confirmar Remoção',
      message: `Tem certeza de que deseja remover ${user.nome} do clube?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Remover',
          handler: () => {
            if (!user.id) {
              console.error('ID do usuário não encontrado');
              return;
            }
            this.authService.removeUser(user.id).subscribe(
              () => {
                this.users = this.users.filter((u) => u.id !== user.id);
              },
              (error) => {
                console.error('Erro ao remover usuário do clube', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  searchUser() {
    if (this.searchEmail.trim() === '') {
      return;
    }
    this.authService.getUserByEmail(this.searchEmail).subscribe(
      (user: User) => {
        this.searchedUser = user;
      },
      (error) => {
        console.error('Erro ao pesquisar usuário', error);
        this.searchedUser = null;
      }
    );
  }
}
