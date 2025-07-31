import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-estante',
  templateUrl: './estante.page.html',
  styleUrls: ['./estante.page.css'],
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
export class EstantePage implements OnInit {
  livros: any[] = [];
  filtro = 'todos';

  constructor(
    private router: Router,
    private livroService: LivroService
  ) { }

  ngOnInit() {
    this.carregarLivros();
    this.livroService.getLivros().subscribe(livros => {
      this.livros = livros;
    })
  }

  carregarLivros() {
    const dados = localStorage.getItem('estante');
    const livrosRaw = dados ? JSON.parse(dados) : [];

    this.livros = livrosRaw.map((livro: any) => {
      const totalPaginas = livro.totalPaginas ?? livro.volumeInfo?.pageCount ?? 0;
      const paginasLidas = Number(livro.paginasLidas ?? 0);

      const progresso = totalPaginas > 0 ? paginasLidas / totalPaginas : 0;
      const percentual = Math.round(progresso * 100);

      return {
        ...livro,
        totalPaginas,
        paginasLidas,
        progresso,
        percentual
      };
    });
  }    

  abrirDetalhes(id: string) {
    this.router.navigate(['/detalhes-livro', id]);  
  }

  get livrosFiltrados() {
    if (this.filtro === 'todos') return this.livros;
    return this.livros.filter((l) => l.status === this.filtro);
  }

  mudarParaLendo(event: Event, id: string) {
    event.stopPropagation();
    const conf = confirm("Mudar para lendo?")
    if (!conf) return;
    const index = this.livros.findIndex((l: any) => l.id === id);
    if (index !== -1) {
      this.livros[index].status = 'lendo';
      localStorage.setItem('estante', JSON.stringify(this.livros))
    }
    this.router.navigate(['/estante']);
  }

  removerLivro(event: Event, id: string) {
    let conf = confirm("Deseja realmente excluir este livro?")
    if(conf) {
      event.stopPropagation(); // Impede a navegação
      this.livros = this.livros.filter(livro => livro.id !== id);
      localStorage.setItem('estante', JSON.stringify(this.livros));
    } else {
      event.stopPropagation();
      return
    }
  }
}
