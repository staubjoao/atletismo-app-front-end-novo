import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Club } from 'src/app/models/club-modal';
import { ClubService } from 'src/app/services/club.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clube-form-entrar',
  templateUrl: './clube-form-entrar.component.html',
  styleUrls: ['./clube-form-entrar.component.scss'],
})
export class ClubeFormEntrarComponent implements OnInit {
  codigo: string = "";

  constructor(
    private modalController: ModalController,
    private clubService: ClubService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async entrarClube() {
    this.clubService.entrarClube(this.codigo).subscribe(
      async (response) => {
        console.log('Entrou!', response);
        await this.showToast('Entrou no clube com sucesso!', 'success');
        this.dismiss();
        this.router.navigate(['/club-list']);
      },
      async (error) => {
        console.error('Erro:', error);
        await this.showToast('Erro ao entrar no clube. Tente novamente!', 'danger');
      }
    );
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top',
    });
    await toast.present();
  }

}
