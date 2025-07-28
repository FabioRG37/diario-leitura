import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Conquista } from '../shared/models/conquista.model';
import { CONQUISTAS_PADRAO } from '../shared/data/conquistas';
import { ToastController } from '@ionic/angular';

const STORAGE_KEY = 'conquistas-usuario';

@Injectable({
  providedIn: 'root'
})
export class ConquistaService {
  private storageInicializado = false;
  private conquistas: Conquista[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {}

  public async marcarComoConquistada(id: string) {
    const conquista = this.conquistas.find(c => c.id === id);
    if (conquista && !conquista.conquistada) {
      conquista.conquistada = true;
      conquista.dataConquista = new Date().toISOString();
      await this.salvarConquistas();
      await this.mostrarToastConquista(conquista.titulo);
    }
  }

  private async mostrarToastConquista(titulo: string) {
    const toast = await this.toastController.create({
      message: `🎉 Conquista desbloqueada: ${titulo}!`,
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }


  public async init(): Promise<void> {
    if (!this.storageInicializado) {
      await this.initStorage();
      this.storageInicializado = true;
    }
  }

  private async initStorage() {
    await this.storage.create();
    const armazenadas = await this.storage.get(STORAGE_KEY);
    this.conquistas = armazenadas ?? CONQUISTAS_PADRAO.map(c => ({ ...c }));
    await this.salvarConquistas();
  }

  private async salvarConquistas() {
    await this.storage.set(STORAGE_KEY, this.conquistas);
  }

  public getConquistas(): Conquista[] {
    return this.conquistas;
  }

  public resetarConquistas() {
    const conf = confirm("Deseja realmente resetar suas conquistas?");

    if (conf) {
      const conquistasResetadas = CONQUISTAS_PADRAO.map(c => ({ 
        ...c, 
        conquistada: false
      }));
      localStorage.setItem('conquistas', JSON.stringify(conquistasResetadas));
      this.conquistas = conquistasResetadas;
      this.salvarConquistas();
    }
  }

  public async verificarConquistas(livros: any[], paginasLidas: number) {
    await this.verificarConquistasLeitura(paginasLidas);
    await this.verificarConquistasFinalizacao(livros);
    await this.verificarConquistasStatusAtualizado(livros);
    await this.verificarPrimeiroLivro(livros);
    await this.verificarSenior();
  }

  private async verificarConquistasLeitura(paginasLidas: number) {
    const conquistas = [
      { paginas: 1, id: 'primeira-pagina' },
      { paginas: 10, id: 'dez-paginas' },
      { paginas: 30, id: 'trinta-paginas' },
      { paginas: 50, id: 'cinquenta-paginas' },
      { paginas: 100, id: 'cem-paginas' },
      { paginas: 500, id: 'quinhentas-paginas' },
      { paginas: 1000, id: 'mil-paginas' }
    ];

    for (const c of conquistas) {
      if (paginasLidas >= c.paginas) {
        await this.marcarComoConquistada(c.id);
      }
    }
  }

  private async verificarConquistasFinalizacao(livros: any[]) {
    const lidos = livros.filter((l: { status: string }) => l.status === 'lido').length;

    const conquistas = [
      { quantidade: 1, id: 'primeiro-livro-finalizado' },
      { quantidade: 3, id: 'tres-livros-finalizados' },
      { quantidade: 5, id: 'cinco-livros-finalizados' },
      { quantidade: 10, id: 'dez-livros-finalizados' }
    ];

    for (const c of conquistas) {
      if (lidos >= c.quantidade) {
        await this.marcarComoConquistada(c.id);
      }
    }
  }

  private async verificarConquistasStatusAtualizado(livros: any[]) {
    const modificados = livros.some((l: { status: string }) =>
      ['lido', 'lendo', 'quero-ler'].includes(l.status)
    );

    if (modificados) {
      await this.marcarComoConquistada('status-atualizado');
    }
  }

  private async verificarPrimeiroLivro(livros: any[]) {
    const primeiro = livros.filter((l: { status: string }) => l.status === 'lendo').length;
    if (primeiro >= 1) {
      await this.marcarComoConquistada('primeiro-livro');
    }
  }

  private async verificarSenior() {
    const todasMenosFinal = this.conquistas.filter(c => c.id !== 'leitor-senior');
    const todasConquistadas = todasMenosFinal.every(c => c.conquistada);

    if (todasConquistadas) {
      this.marcarComoConquistada('leitor-senior');
    }
  }
}
