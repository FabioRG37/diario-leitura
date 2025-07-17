import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estante',
  templateUrl: './estante.page.html',
  styleUrls: ['./estante.page.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class EstantePage implements OnInit {
  livros: any[] = [];
  filtro = 'todos';

  constructor(private router: Router) { }

  ngOnInit() {
    this.carregarLivros()
  }

  ionViewWillEnter() {
    this.carregarLivros();
  }

  carregarLivros() {
    const dados = localStorage.getItem('estante');
    this.livros = dados ? JSON.parse(dados) : [];
  }

  abrirDetalhes(id: string) {
    this.router.navigate(['/detalhes-livro', id]);  
  }

  get livrosFiltrados() {
    if (this.filtro === 'todos') return this.livros;
    return this.livros.filter((l) => l.status === this.filtro);
  }

  removerLivro(event: Event, id: string) {
    event.stopPropagation(); // Impede a navegação
    this.livros = this.livros.filter(livro => livro.id !== id);
    localStorage.setItem('livrosEstante', JSON.stringify(this.livros));
  }
}
