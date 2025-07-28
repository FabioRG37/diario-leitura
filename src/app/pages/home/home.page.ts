import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConquistaService } from 'src/app/services/conquista.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  animations: [
    trigger('fadePage', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {

  constructor(
    private conquistaService: ConquistaService
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.registrarAcessoDiario();
    this.registrarUsoModoEscuro();
  }

  private registrarAcessoDiario(): void {
    const hoje = new Date();
    const hojeStr = hoje.toDateString();

    let acessosRaw = localStorage.getItem('diasAcessados');
    let acessos: string[] = acessosRaw ? JSON.parse(acessosRaw) : [];

    if (!acessos.includes(hojeStr)) {
      acessos.push(hojeStr);
    }

    // Normaliza, ordena e mantém últimos 30 dias
    acessos = acessos
      .map(d => new Date(d).toDateString())
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-30);

    localStorage.setItem('diasAcessados', JSON.stringify(acessos));

    // Verificar 7 dias consecutivos
    let consecutivos = 1;
    for (let i = acessos.length - 2; i >= 0; i--) {
      const diaAtual = new Date(acessos[i + 1]);
      const diaAnterior = new Date(acessos[i]);
      const diffDias = (diaAtual.getTime() - diaAnterior.getTime()) / (1000 * 3600 * 24);
      if (diffDias === 1) {
        consecutivos++;
        if (consecutivos === 7) {
          this.conquistaService.marcarComoConquistada('por-sete-dias');
          break;
        }
      } else {
        consecutivos = 1;
      }
    }
  }

  private registrarUsoModoEscuro(): void {
    const hoje = new Date().toDateString();
    const modoEscuroAtivo = document.body.classList.contains('dark');

    if (!modoEscuroAtivo) return;

    let acessosRaw = localStorage.getItem('diasModoEscuro');
    let acessos: string[] = acessosRaw ? JSON.parse(acessosRaw) : [];

    if (!acessos.includes(hoje)) {
      acessos.push(hoje);
    }

    // Mantém os últimos 30 dias
    acessos = acessos
      .map(d => new Date(d).toDateString())
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-30);

    localStorage.setItem('diasModoEscuro', JSON.stringify(acessos));

    if (acessos.length >= 3) {
      this.conquistaService.marcarComoConquistada('leitor-noturno');
    }
  }

}
