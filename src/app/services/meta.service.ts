import { Injectable } from '@angular/core';
import { Meta } from '../shared/models/meta.model';
import { ConquistaService } from './conquista.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly STORAGE_KEY = 'metas';
  private metas: Meta[] = [];

  constructor(
    private conquistaService: ConquistaService,
    private storage: Storage
  ) {
    this.init();
    this.carregarMetas();
  }

  private async init() {
    await this.storage['create']();
    await this.carregarMetas();
  }

  public getMetas(): Meta[] {
    return this.metas;
  }

  private async carregarMetas(): Promise<void> {
    const metasSalvas = await this.storage['get']('metas');
    this.metas = metasSalvas || [];
  }

  private async salvarMetas(): Promise<void> {
    await this.storage['set']('metas', this.metas);
  }

  public listarMetas(): Meta[] {
    return [...this.metas];
  }

  public async adicionarMeta(meta: Meta): Promise<void> {
    this.metas.push(meta);
    await this.salvarMetas();
  }

  public removerMeta(id: string): void {
    this.metas = this.metas.filter(m => m.id !== id);
    this.salvarMetas();
  }

  public marcarComoConcluida(id: string): void {
    const meta = this.metas.find(m => m.id === id);
    if (meta && !meta.concluida) {
      meta.concluida = true;
      meta.dataConclusao = new Date().toISOString();
      this.salvarMetas();

      // ✅ Verifica conquista relacionada
      this.conquistaService.marcarComoConquistada('meta-concluida');
    }
  }

  public verificarMetaFinalizacaoLivro(idLivro: string): void {
    const metasLivro = this.metas.filter(meta =>
      meta.tipo === 'livro' && meta.alvo === idLivro && !meta.concluida
    );

    metasLivro.forEach(meta => this.marcarComoConcluida(meta.id));
  }

  // ✨ Futuro: método para verificar metas por número de páginas
  public verificarProgressoPaginas(paginasLidas: number): void {
    const metasPaginas = this.metas.filter(meta =>
      meta.tipo === 'paginas' &&
      typeof meta.alvo === 'number' &&
      paginasLidas >= meta.alvo &&
      !meta.concluida
    );

    metasPaginas.forEach(meta => this.marcarComoConcluida(meta.id));
  }
}
