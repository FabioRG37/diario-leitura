import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.page.html',
  styleUrls: ['./estatisticas.page.css'],
  animations: [
      trigger('fadePage', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms ease-in', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('200ms ease-out', style({ opacity: 0 }))
        ])
      ])
    ]
})
export class EstatisticasPage implements OnInit {
  totalLivros = 0;
  livrosConcluidos = 0;
  paginasLidas = 0;
  tempoEstimado = 0;
  progressoMedio = 0;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    const livros = JSON.parse(localStorage.getItem('estante') || '[]');
    console.log('Livros carregados:', livros);

    this.totalLivros = livros.length;
    this.livrosConcluidos = livros.filter((l: any) => l.status === 'lido').length;

    let totalPaginasLidas = 0;
    let totalPaginasPossiveis = 0;

    livros.forEach((livro: any) => {
      const lidas = livro.paginasLidas || 0;
      const total = livro.totalPaginas || livro.volumeInfo?.pageCount || 0;

      totalPaginasLidas += lidas;
      totalPaginasPossiveis += total;
    });

    this.paginasLidas = totalPaginasLidas;
    this.tempoEstimado = Math.round(totalPaginasLidas * 1); // 1 min por página
    this.progressoMedio = totalPaginasPossiveis
      ? Math.round((totalPaginasLidas / totalPaginasPossiveis) * 100)
      : 0;
  }
}
