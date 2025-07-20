import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-livro',
  templateUrl: './detalhes-livro.page.html',
  styleUrls: ['./detalhes-livro.page.css'],
})
export class DetalhesLivroPage implements OnInit {
  livroId: string | null = null;
  livro: any = null;
  jaNaEstante: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: GoogleBooksService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.livroId = this.route.snapshot.paramMap.get('id');

    if (this.livroId) {
      this.bookService.buscarLivroPorId(this.livroId).subscribe({
        next: (res) => {
          this.livro = res;
          this.verificarSeEstaNaEstante();
        },
        error: (err) => console.error('Erro ao buscar livro:', err),
      });
    }
  }

  verificarSeEstaNaEstante() {
    const estante = JSON.parse(localStorage.getItem('estante') || '[]');
    this.jaNaEstante = estante.some((item: any) => item.id === this.livro?.id);
  }

  async adicionarLivro() {
    const alert = await this.alertCtrl.create({
      header: 'Adicionar à estante',
      message: 'Selecione o status de leitura:',
      inputs: [
        {
          name: 'status',
          type: 'radio',
          label: 'Quero ler',
          value: 'quero-ler',
          checked: true
        },
        {
          name: 'status',
          type: 'radio',
          label: 'Lendo',
          value: 'lendo'
        },
        {
          name: 'status',
          type: 'radio',
          label: 'Lido',
          value: 'lido'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (data) => {
            this.salvarNoLocalStorage(data);
          }
        }
      ]
    });

    await alert.present();
  }

  salvarNoLocalStorage(status: string) {
    const estante = JSON.parse(localStorage.getItem('estante') || '[]');

    // Verifica se o livro já está salvo
    const existe = estante.find((item: any) => item.id === this.livro.id);

    if (existe) {
      existe.status = status;
    } else {
      estante.push({
        id: this.livro.id,
        volumeInfo: this.livro.volumeInfo,
        status
      });
    }

    localStorage.setItem('estante', JSON.stringify(estante));
    this.jaNaEstante = true;

    this.toastCtrl.create({
      message: 'Livro salvo com sucesso!',
      duration: 2000,
      color: 'success'
    }).then(toast => {
      toast.present()
      this.router.navigate(['/estante']);
    });
  }

}
