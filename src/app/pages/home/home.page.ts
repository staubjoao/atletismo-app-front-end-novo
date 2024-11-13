import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email: any = '';
  funcao: any = '';
  senhaAtual: string = '';
  senhaNova: string = '';
  confirmarSenha: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserInfo();
    this.resetPasswordFields();
  }

  loadUserInfo() {
    this.email = localStorage.getItem("email");
    this.funcao = localStorage.getItem("role");
  }

  async changePassword() {
    if (this.senhaNova !== this.confirmarSenha) {
      await this.showToast('A nova senha e a confirmação não coincidem.');
      return;
    }

    this.userService.alterarSenha(this.senhaAtual, this.senhaNova).subscribe(
      async (response) => {
        await this.showToast('Senha alterada com sucesso!');
        this.resetPasswordFields();
      },
      async (error) => {
        await this.showToast('Erro ao alterar a senha. ' + error.error);
        console.error(error);
      }
    );
  }

  resetPasswordFields() {
    this.senhaAtual = '';
    this.senhaNova = '';
    this.confirmarSenha = '';
  }

  async openEditDialog() {
    try {
      const userData = await this.userService.consultarNomeEmail().toPromise();

      const alert = await this.alertController.create({
        header: 'Editar informações',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Nome',
            value: userData?.nome || '',
          },
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            value: userData?.email || '',
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Salvar',
            handler: (data) => {
              this.updateUserInfo(data.name, data.email);
            },
          },
        ],
      });

      await alert.present();
    } catch (error) {
      await this.showToast('Erro ao carregar informações do usuário.');
    }
  }


  updateUserInfo(nome: string, email: string) {
    const body = {
      nome: nome,
      email: email
    }
    this.userService.atualizarNomeEmail(body).subscribe(
      async () => {
        this.email = email;
        await this.showToast('Informações atualizadas com sucesso!');
        this.authService.logout();
      },
      async () => {
        await this.showToast('Erro ao atualizar informações.');
      }
    );
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
