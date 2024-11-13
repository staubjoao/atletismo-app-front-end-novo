import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { TrainingScheduleService } from 'src/app/services/training-schedule.service';
import { EventService } from 'src/app/services/event.service';
import { TrainingSessionService } from 'src/app/services/training-session.service';

@Component({
  selector: 'app-sessao-treino-form',
  templateUrl: './sessao-treino-form.component.html',
  styleUrls: ['./sessao-treino-form.component.scss'],
})
export class SessaoTreinoFormComponent  implements OnInit {

  treino: any;
  feedbackTreino: string = "";

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private sessaoTreinoService: TrainingSessionService,
    private toastController: ToastController
  ) {
    this.treino = this.navParams.get('treino');
    console.log('Treino recebido no modal:', this.treino);
  }

  ngOnInit() {
    if (this.treino && this.treino.exercicios) {
      this.treino.exercicios.sort((a: any, b: any) => a.indice - b.indice);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async salvarSessaoTreino() {
    const now = new Date();
    const localDateTime = now.toISOString().split('.')[0];

    const treinoData = {
      idHorarioTreinamento: this.treino.id,
      data: localDateTime,
      feedback: this.feedbackTreino,
      exercicios: this.treino.exercicios.map((exercicio: any) => ({
        id: exercicio.id,
        tempo: exercicio.tempo ? parseFloat(exercicio.tempo) : null,
        concluido: exercicio.concluido || false
      }))
    };

    console.log(treinoData);

    this.sessaoTreinoService.salvar(treinoData).subscribe(
      async response => {
        console.log(response);
        await this.presentToast('Sessão salva com sucesso!', 'success');
        this.dismiss();
      },
      async error => {
        console.log("teste ", error);
        await this.presentToast('Erro ao salvar a sessão.', 'danger');
      }
    );
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

}
