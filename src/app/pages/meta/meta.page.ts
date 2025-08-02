import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CriarMetaModalComponent } from 'src/app/components/modals/criar-meta-modal/criar-meta-modal.component';
import { MetaService } from 'src/app/services/meta.service';
import { Meta } from 'src/app/shared/models/meta.model'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.page.html',
  styleUrls: ['./meta.page.css'],
})
export class MetaPage {
  filtro: 'ativas' | 'concluidas' = 'ativas';
  metas: Meta[] = [];

  constructor(
    private modalCtrl: ModalController,
    private metaService: MetaService,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    // this.metas = this.metaService.listarMetas();
    this.metas = this.metaService.getMetas();
  }

  async abrirModalCriarMeta() {
    const modal = await this.modalCtrl.create({
      component: CriarMetaModalComponent
    });

    modal.onDidDismiss().then(result => {
      if (result.data === 'salvou') {
        this.carregarMetas(); // atualiza a lista de metas
      }
    });

    await modal.present();
  }

  async mostrarToast(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

  metasFiltradas(): Meta[] {
    return this.metas.filter(m => this.filtro === 'ativas' ? !m.concluida : m.concluida);
  }

  async editarMeta(meta: Meta) {
    const modal = await this.modalCtrl.create({
      component: CriarMetaModalComponent,
      componentProps: { metaExistente: meta}
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.metas = this.metaService.listarMetas();
      this.mostrarToast("Meta atualizada com sucesso!");
    }
  }

  deletarMeta(id: string) {
    const conf = confirm("Deseja realmente remover esta meta?");
    if (conf) {
      this.metaService.removerMeta(id);
      this.metas = this.metaService.listarMetas();
    }
  }

  carregarMetas() {
    alert("Nada por aqui!")
  }
}
