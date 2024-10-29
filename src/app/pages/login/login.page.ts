import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  onLogin() {
    const body = {
      email: this.email,
      senha: this.senha,
    };
    this.authService.login(body).subscribe(
      (response) => {
        console.log('Login successful', response);
        localStorage.setItem('role', response.funcao);
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', this.email);
        localStorage.setItem('userId', response.usuarioId);
        this.navCtrl.navigateForward('/home');
      },
      async (error) => {
        console.error('Login failed', error);
        const alert = await this.alertController.create({
          header: 'Login Falhou',
          message: 'Senha ou email incorretos. Tente Novamente',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  goToSignup() {
    this.navCtrl.navigateForward('/sign-up');
  }
}
