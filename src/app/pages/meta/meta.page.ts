import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CriarMetaModalComponent } from 'src/app/components/modals/criar-meta-modal/criar-meta-modal.component';
import { MetaService } from 'src/app/services/meta.service';
import { Meta } from 'src/app/shared/models/meta.model'

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
    private metaService: MetaService
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

  metasFiltradas(): Meta[] {
    return this.metas.filter(m => this.filtro === 'ativas' ? !m.concluida : m.concluida);
  }

  editarMeta(meta: Meta) {
    // Lógica para editar meta
    alert('Editar ainda não implementado');
  }

  deletarMeta(id: string) {
    this.metaService.removerMeta(id);
    this.metas = this.metaService.listarMetas();
  }

  carregarMetas() {
    alert("Nada por aqui!")
  }
}
