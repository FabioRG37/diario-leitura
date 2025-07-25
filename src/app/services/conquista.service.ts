import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Conquista } from '../shared/models/conquista.model';
import { CONQUISTAS_PADRAO } from '../shared/data/conquistas';

const STORAGE_KEY = 'conquistas-usuario';

@Injectable({
  providedIn: 'root'
})
export class ConquistaService {
  private conquistas: Conquista[] = [];

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    const armazenadas = await this.storage.get(STORAGE_KEY);

    if (armazenadas) {
      this.conquistas = armazenadas;
    } else {
      this.conquistas = CONQUISTAS_PADRAO.map(c => ({ ...c }));
      await this.salvarConquistas();
    }
  }

  private async salvarConquistas() {
    await this.storage.set(STORAGE_KEY, this.conquistas);
  }

  public getConquistas(): Conquista[] {
    return this.conquistas;
  }

  public async marcarComoConquistada(id: string) {
    const conquista = this.conquistas.find(c => c.id === id);
    if (conquista && !conquista.conquistada) {
      conquista.conquistada = true;
      conquista.dataConquista = new Date().toISOString(); // ⏱ registra data e hora
      await this.salvarConquistas();
    }
  }

  public async resetarConquistas() {
    this.conquistas = CONQUISTAS_PADRAO.map(c => ({ ...c }));
    await this.salvarConquistas();
  }

  marcarConquistasDeLeitura(paginasLidas: number) {
    const conquistas = [
      { paginas: 1, id: 'primeira-pagina' },
      { paginas: 10, id: 'dez-paginas' },
      { paginas: 30, id: 'trinta-paginas' },
      { paginas: 50, id: 'cinquenta-paginas' },
      { paginas: 100, id: 'cem-paginas' },
      { paginas: 500, id: 'quinhentas-paginas' },
      { paginas: 1000, id: 'mil-paginas' },
    ];

    conquistas.forEach(c => {
      if (paginasLidas >= c.paginas) {
        this.marcarComoConquistada(c.id);
      }
    });
  }

  marcarConquistasDeLivrosFinalizados(livros: any[]) {
    const lidos = livros.filter((l: { status: string }) => l.status === 'lido').length;

    const conquistas = [
      { quantidade: 1, id: 'primeiro-livro-finalizado' },
      { quantidade: 3, id: 'tres-livros-finalizados' },
      { quantidade: 5, id: 'cinco-livros-finalizados' },
      { quantidade: 10, id: 'dez-livros-finalizados' },
    ];

    conquistas.forEach(c => {
      if (lidos >= c.quantidade) {
        this.marcarComoConquistada(c.id);
      }
    });
  }

}
