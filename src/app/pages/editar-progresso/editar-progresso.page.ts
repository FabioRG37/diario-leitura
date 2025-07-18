import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-editar-progresso',
  templateUrl: './editar-progresso.page.html',
  styleUrls: ['./editar-progresso.page.scss'],
})
export class EditarProgressoPage implements OnInit {
  livroId: string = '';
  progresso: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.livroId = this.route.snapshot.paramMap.get('id') || '';
    const livros = (await this.storage.get('estante')) || [];
    const livro = livros.find((l: any) => l.id === this.livroId);
    if (livro) {
      this.progresso = livro.progresso ?? 0;
    }
  }

  async salvarProgresso() {
    const livros = (await this.storage.get('estante')) || [];
    const index = livros.findIndex((l: any) => l.id === this.livroId);
    if (index !== -1) {
      livros[index].progresso = this.progresso;
      await this.storage.set('estante', livros);
    }
    this.router.navigate(['/estante']);
  }
}
