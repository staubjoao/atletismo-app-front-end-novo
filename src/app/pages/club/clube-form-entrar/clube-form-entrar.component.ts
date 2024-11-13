import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private router: Router
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }

  entrarClube() {
    this.clubService.entrarClube(this.codigo).subscribe(
      (response) => {
        console.log('Entrou!', response);
        this.dismiss();
        this.router.navigate(['/club-list']);
      },
      (error) => {
        console.error('Erro:', error);
      }
    );

  }

}
