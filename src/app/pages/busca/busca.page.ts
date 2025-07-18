import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.css'],
})
export class BuscaPage {
  termoBusca = '';
  resultados: any[] = [];

  constructor(private booksService: GoogleBooksService) {}

  buscarLivros() {
    if (!this.termoBusca.trim()) return;

    this.booksService.buscarLivros(this.termoBusca).subscribe({
      next: (res: any) => {
        this.resultados = res.items || [];
      },
      error: (err) => {
        console.error('Erro ao buscar livros:', err);
      }
    });
  }
}