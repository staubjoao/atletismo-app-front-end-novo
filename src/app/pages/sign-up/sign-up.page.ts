import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClubService } from 'src/app/services/club.service';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  name: string = '';
  email: string = '';
  senha: string = '';
  funcao: string = '';
  clubCode: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private clubService: ClubService,
    private alertController: AlertController
  ) {}

  onSignup() {
    if (this.clubCode.trim()) {
      console.log("Teste");
      this.signupWithClubCode();
    } else {
      console.log("Teste2");
      this.createUser(null);
    }
  }

  private signupWithClubCode() {
    this.clubService
      .getClubByCode(this.clubCode)
      .pipe(
        switchMap((club) => {
          if (!club || !club.id) {
            throw new Error('Invalid club code');
          }
          return of(club.id);
        }),
        catchError((error) => {
          console.error('Error fetching club:', error);
          this.presentAlert(
            'Erro',
            'Código de clube inválido. Verifique o código e tente novamente.'
          );
          return of(null);
        })
      )
      .subscribe((clubId) => {
        if (clubId) {
          this.createUser(clubId);
        }
      });
  }

  private createUser(clubId: any) {
    console.log('Role:', this.funcao);
    const newUser: User = {
      nome: this.name,
      email: this.email,
      senha: this.senha,
      funcao: this.funcao.toUpperCase(),
    };

    this.authService.createUser(newUser).subscribe(
      (response) => {
        this.presentAlert('Sucesso', 'Sua conta foi criada com sucesso');
        this.navCtrl.navigateForward('/login');
      },
      (error) => {
        console.error('Signup failed', error);
        this.presentAlert('Erro', 'Erro ao criar conta. Tente novamente.');
      }
    );
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
