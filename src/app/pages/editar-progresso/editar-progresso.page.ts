import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-editar-progresso',
  templateUrl: './editar-progresso.page.html',
  styleUrls: ['./editar-progresso.page.scss'],
})
export class EditarProgressoPage implements OnInit {
  livroId!: string;
  livro: any;
  paginasLidas: number = 0;
  totalPaginasManual: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.livroId = this.route.snapshot.paramMap.get('id')!;
    await this.storage.create();

    const livros = (await this.storage.get('livros')) || [];
    this.livro = livros.find((l: any) => l.id === this.livroId);

    if (this.livro?.progresso) {
      this.paginasLidas = Math.round(this.livro.progresso * this.livro.volumeInfo.pageCount);
    }
  }

  salvarProgresso() {
    const paginasLidasNum = Number(this.paginasLidas);

    // Verifica se veio da API ou foi informado manualmente
    const totalPaginas =
      this.livro?.volumeInfo?.pageCount || this.totalPaginasManual;

    if (!totalPaginas || totalPaginas <= 0) {
      alert('Você precisa informar o número total de páginas.');
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

    // Atualiza o livro no localStorage
    const livros = JSON.parse(localStorage.getItem('estante') || '[]');
    const index = livros.findIndex((l: any) => l.id === this.livro.id);
    if (index !== -1) {
      livros[index] = this.livro;
      localStorage.setItem('estante', JSON.stringify(livros));
    }

    this.router.navigate(['/estante']);
  }
}
