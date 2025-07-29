import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MetaService } from 'src/app/services/meta.service';
import { Meta } from 'src/app/shared/models/meta.model';

@Component({
  selector: 'app-criar-meta-modal',
  templateUrl: './criar-meta-modal.component.html',
  styleUrls: ['./criar-meta-modal.component.css'],
})
export class CriarMetaModalComponent implements OnInit {
  @Input() metaExistente?: Meta;
  
  titulo: string = '';
  descricao: string = '';
  tipo: string = '';
  objetivoPaginas: number = 0;
  dataLimite: Date | null = null;
  livros: any[] = [];
  livroSelecionado: string = '';
  isModalOpen = false;

  constructor(
    private modalCtrl: ModalController,
    private metaService: MetaService,
    private localStorage: Storage
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
  }
  
  async inicializarFormulario() {
    await this.localStorage.create();
    const livrosSalvos = await JSON.parse(localStorage.getItem('estante') || '[]');
    this.livros = livrosSalvos || [];

    if (this.metaExistente) {
      this.titulo = this.metaExistente.titulo;
      this.descricao = this.metaExistente.descricao;
      this.tipo = this.metaExistente.tipo;
      this.objetivoPaginas = this.metaExistente.objetivoPaginas;
      this.livroSelecionado = String(this.metaExistente.alvo);
      this.dataLimite = this.metaExistente.dataLimite ? new Date(this.metaExistente.dataLimite) : null;
    }
  }
  
  onTipoChange() {
    if (this.tipo === 'paginas') {
      this.objetivoPaginas = 0;
    } else {
      this.objetivoPaginas = 0; // ou você pode excluir esse campo, mas manter 0 é mais seguro
    }
  }

  openDateModal() {
    this.isModalOpen = true;
  }

  cancelDateSelection() {
    this.isModalOpen = false;
  }

  confirmDateSelection() {
    this.isModalOpen = false;
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

  async salvar() {
    const metaAtualizada: Meta = {
      id: this.metaExistente?.id ?? Date.now().toString(),
      titulo: this.titulo,
      descricao: this.descricao,
      tipo: this.tipo,
      paginasLidas: this.metaExistente?.paginasLidas ?? 0,
      objetivoPaginas: this.objetivoPaginas,
      alvo: this.livroSelecionado,
      dataLimite: this.dataLimite ?? undefined,
      concluida: this.metaExistente?.concluida ?? false,
      dataConclusao: this.metaExistente?.dataConclusao ?? ''
    };

    if (this.metaExistente) {
      await this.metaService.atualizarMeta(metaAtualizada);
    } else {
      await this.metaService.adicionarMeta(metaAtualizada);
    }

    this.modalCtrl.dismiss('salvou');
  }

  criarMeta() {
    this.salvar()
  }
}
