import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { ClubService } from '../../services/club.service';
import { User } from 'src/app/models/user-model';

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

  constructor(
    private authService: AuthService,
    private clubService: ClubService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  async loadInitialData() {
    const userInfo = await this.authService.getUserInfo().toPromise();
    if (!userInfo) {
      console.error('Informações do usuário não encontradas');
      return;
    }
    this.isTREINADOR = userInfo.funcao === 'TREINADOR';
    // this.clubId = userInfo.clubId?.toString() ?? '';
    this.loadUsers();
    this.loadClubName();
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

  loadUsers(event?: InfiniteScrollCustomEvent) {
    this.authService
      .getUsersByClubId(this.clubId, this.currentPage, this.pageSize)
      .subscribe(
        (newUsers: User[]) => {
          this.users = [...this.users, ...newUsers];
          if (event) {
            event.target.complete();
            if (newUsers.length < this.pageSize) {
              event.target.disabled = true;
            }
          }
        },
        (error) => {
          console.error('Erro ao carregar usuários', error);
          if (event) {
            event.target.complete();
          }
        }
      );
  }

  loadMoreUsers(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadUsers(event);
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
