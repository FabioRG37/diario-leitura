import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage {
  email: string = '';
  senha: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async criarConta() {
    const loading = await this.loadingCtrl.create({
      message: 'Criando conta...',
      spinner: 'crescent'
    });
    await loading.present();

    this.authService.registrar(this.email, this.senha)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      })
      .catch(async err => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Erro ao criar conta: ' + err.message,
          duration: 3000,
          color: 'danger'
        });
        toast.present();
      });
  }
}
