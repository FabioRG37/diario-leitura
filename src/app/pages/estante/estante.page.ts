import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { LivroService } from 'src/app/services/livro.service';
import { Subscription } from 'rxjs';


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
export class EstantePage {
  livros: any[] = [];
  filtro = 'todos';
  livrosSub!: Subscription;

  constructor(
    private router: Router,
    private livroService: LivroService
  ) { }

  ionViewWillEnter() {
    this.carregarLivros();
  }

  carregarLivros() {
    if (this.livrosSub) this.livrosSub.unsubscribe();

    this.livrosSub = this.livroService.getLivros().subscribe(livros => {
      this.livros = livros.map((livro: any) => {
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

    this.livroService.atualizarStatus(id, 'lendo')
      .then(() => {
        console.log('Status atualizado com sucesso');
      })
      .catch(error => {
        console.error('Erro ao atualizar status: ', error);
      });
  }

  removerLivro(event: Event, id: string) {
    event.stopPropagation(); // Impede a navegação
    const conf = confirm("Deseja realmente excluir este livro?")
    if (!conf) return;
    
    this.livroService.deleteLivro(id)
      .then(() => {
        console.log("Livro removido com sucesso.");
      })
      .catch(error => {
        console.error("Erro ao remover livro:", error);
      });
  }

  ngOnDestroy() {
    if (this.livrosSub) this.livrosSub.unsubscribe();
  }
}
