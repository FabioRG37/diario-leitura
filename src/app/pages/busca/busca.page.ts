import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.css'],
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
export class BuscaPage {
  buscaSubject = new Subject<string>();
  termoBusca = '';
  resultados: any[] = [];

  constructor(private booksService: GoogleBooksService) {}

  ngOnInit() {
    this.buscaSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((termo) => {
      this.termoBusca = termo;
      this.buscarLivros();
    });
  }

  onInputChange(termo: string) {
    this.buscaSubject.next(termo);
  }

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