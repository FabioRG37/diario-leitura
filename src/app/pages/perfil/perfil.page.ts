import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { AlertController, ToastController } from '@ionic/angular';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nome: string = '';
  fotoURL: string = '';
  novaSenha: string = '';
  senhaAtual: string = '';

  constructor(
    private perfilService: PerfilService, 
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    const perfil = await this.perfilService.obterPerfil();
    if (perfil) {
      this.nome = perfil['nome'];
      this.fotoURL = perfil['fotoURL'] || 'assets/img/avatar-default.svg';
    }
  }

  async uploadFoto(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const storage = getStorage();
    const filePath = `fotosPerfil/${file.name}`
    const storageRef = ref(storage, filePath);

    await uploadBytes(storageRef, file);
    this.fotoURL = await getDownloadURL(storageRef);
  }

  async salvar() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    try {
      await this.perfilService.salvarPerfil({
        nome: this.nome,
        fotoURL: this.fotoURL
      });

      if (this.novaSenha && this.novaSenha.length >= 6) {
        const alert = await this.alertCtrl.create({
          header: 'Confirme a sua senha atual',
          inputs: [{ name: 'senhaAtual', type: 'password', placeholder: 'Senha atual' }],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Confirmar',
              handler: async (data) => {

                const credential = EmailAuthProvider.credential(user.email!, data.senhaAtual);

                try {
                  await reauthenticateWithCredential(user, credential);
                  await updatePassword(user, this.novaSenha);

                  const toast = await this.toastCtrl.create({
                    message: 'Senha alterada com sucesso!',
                    duration: 3000,
                    color: 'success'
                  });
                  await toast.present();

                  this.novaSenha = '';
                } catch (err) {
                  const toast = await this.toastCtrl.create({
                    message: 'Erro ao alterar senha: ' + (err instanceof Error ? err.message : String(err)),
                    duration: 3000,
                    color: 'danger'
                  });
                  await toast.present();
                }
              }
            }
          ]
        });
        await alert.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Perfil atualizado!',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      }

    } catch (err) {
      const toast = await this.toastCtrl.create({
        message: 'Erro ao salvar perfil: ' + (err instanceof Error ? err.message : String(err)),
        duration: 3000,
        color: 'danger'
      });
      await toast.present();
    }
  }

}
