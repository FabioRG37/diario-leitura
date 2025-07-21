import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-editar-progresso',
  templateUrl: './editar-progresso.page.html',
  styleUrls: ['./editar-progresso.page.scss'],
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
export class EditarProgressoPage implements OnInit {
  livroId!: string;
  livro: any;
  paginasLidas: number = 0;
  totalPaginasDetectado: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.livroId = this.route.snapshot.paramMap.get('id')!;
    await this.storage.create();

    const livros = JSON.parse(localStorage.getItem('estante') || '[]');
    this.livro = livros.find((l: any) => l.id === this.livroId);

    if (this.livro) {
      const total = this.livro.volumeInfo?.pageCount || null;
      this.totalPaginasDetectado = total;
      this.paginasLidas = this.livro.paginasLidas ?? 0;
    }
    console.log("Livro carregado:", this.livro);
  }

  async salvarProgresso() {
    const paginasLidasNum = Number(this.paginasLidas);
    const totalPaginas = this.totalPaginasDetectado;

    if (!totalPaginas || totalPaginas <= 0) {
      alert('Número total de páginas não encontrado.');
      return;
    }

    if (
      isNaN(paginasLidasNum) ||
      paginasLidasNum < 0 ||
      paginasLidasNum > totalPaginas
    ) {
      alert('Número de páginas lidas inválido.');
      return;
    }

    this.livro.progresso = paginasLidasNum / totalPaginas;
    this.livro.paginasLidas = paginasLidasNum;
    this.livro.totalPaginas = totalPaginas;

    // Atualiza no localStorage
    const livros = JSON.parse(localStorage.getItem('estante') || '[]');
    const index = livros.findIndex((l: any) => l.id === this.livro.id);
    if (index !== -1) {
      livros[index] = this.livro;
      localStorage.setItem('estante', JSON.stringify(livros));
    }

    this.router.navigate(['/estante']);
  }
}
