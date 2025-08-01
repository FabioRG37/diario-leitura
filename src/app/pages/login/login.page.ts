import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Entrando...',
      spinner: 'crescent',
    });
    await loading.present();

    this.authService.login(this.email, this.senha)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      })
      .catch(async err => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Erro ao entrar: ' + err.message,
          duration: 3000,
          color: 'danger',
        });
        toast.present();
      });
  }

  async registrar() {
    const loading = await this.loadingCtrl.create({
      message: 'Criando conta...',
      spinner: 'crescent',
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
          message: 'Erro ao registrar: ' + err.message,
          duration: 3000,
          color: 'danger',
        });
        toast.present();
      });
  }
}
