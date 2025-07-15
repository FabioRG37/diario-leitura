import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estante',
  templateUrl: './estante.page.html',
  styleUrls: ['./estante.page.css'],
})
export class EstantePage implements OnInit {
  livros: any[] = [];
  filtro = 'todos';

  constructor() { }

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

  get livrosFiltrados() {
    if (this.filtro === 'todos') return this.livros;
    return this.livros.filter((l) => l.status === this.filtro);
  }
}
