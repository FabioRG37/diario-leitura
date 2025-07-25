import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConquistaService } from 'src/app/services/conquista.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.page.html',
  styleUrls: ['./estatisticas.page.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
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
  livrosPlanejados = 0;
  livrosLendo = 0;
  paginasLidas = 0;
  tempoEstimado = "";
  progressoMedio = 0;
  minutos = 0;
  totalConquistas = 0;
  conquistasAlcancadas = 0;
  progressoConquistas = 0;

  pieChartLabels: string[] = ['Lidos', 'Lendo', 'Quero Ler'];
  
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#4CAF50', '#ffca28', '#2196f3'],
      hoverBackgroundColor: ['#45a049', '#FFC107', '#1976d2']
      },
    ],
  };

  constructor(
    private storage: Storage,
    private conquistaService: ConquistaService
  ) {}

  async ngOnInit() {
    this.carregarEstatisticas();
    await this.storage.create();
    const livros = JSON.parse(localStorage.getItem('estante') || '[]');

    const lidos = livros.filter((l: any) => l.status === 'lido').length;
    const lendo = livros.filter((l: any) => l.status === 'lendo').length;
    const planejados = livros.filter((l: any) => l.status === 'quero-ler').length;

    this.pieChartData.datasets[0].data = [lidos, lendo, planejados];

    this.totalLivros = livros.length;
    this.livrosConcluidos = livros.filter((l: any) => l.status === 'lido').length;

    let totalPaginasLidas = 0;
    let totalPaginasPossiveis = 0;
    
    // Conquistas
    const conquistas = this.conquistaService.getConquistas();
    this.totalConquistas = conquistas.length;
    this.conquistasAlcancadas = conquistas.filter(c => c.conquistada).length;
    this.progressoConquistas = this.totalConquistas
      ? Math.round((this.conquistasAlcancadas / this.totalConquistas) * 100)
      : 0;

    livros.forEach((livro: any) => {
      let paginasLidas = 0;
      if (livro.status == 'lido') {
        paginasLidas = livro.volumeInfo?.pageCount;
      }
      if (livro.status == 'lendo') {
        paginasLidas = livro.paginasLidas;
      }
      const total = livro.totalPaginas || livro.volumeInfo?.pageCount || 0;

      totalPaginasLidas += paginasLidas;
      totalPaginasPossiveis += total;
    });

    this.paginasLidas = totalPaginasLidas;
    this.tempoEstimado = this.minutosParaDiasEHoras(Math.round(totalPaginasLidas * 1.65));
    // this.tempoEstimado = Math.round(totalPaginasLidas * 1.65); // 1 min por página
    this.progressoMedio = totalPaginasPossiveis
      ? Math.round((totalPaginasLidas / totalPaginasPossiveis) * 100)
      : 0;
  }

  carregarEstatisticas() {
    const livros = JSON.parse(localStorage.getItem('estante') || '[]');
    
    this.totalLivros = livros.length;
    this.livrosConcluidos = livros.filter((l: any) => l.status === 'lido').length;
    this.livrosLendo = livros.filter((l: any) => l.status === 'lendo').length;
    this.livrosPlanejados = livros.filter((l: any) => l.status === 'quero-ler').length;

    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [{
        data: [this.livrosConcluidos, this.livrosLendo, this.livrosPlanejados],
        backgroundColor: ['#4CAF50', '#ffca28', '#2196f3'],
        hoverBackgroundColor: ['#45a049', '#FFC107', '#1976d2']
      }]
    };
  }

  minutosParaDiasEHoras(minutos: number) {
    const dias = Math.floor(minutos / (60 * 24))
    const horas = Math.floor((minutos % (60 * 24)) / 60);
    const minutosRestantes = minutos % 60;
    return `${dias} dias ${horas} h ${minutosRestantes} min`
  }
}
