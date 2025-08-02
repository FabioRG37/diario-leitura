// src/app/components/app-toolbar/app-toolbar.component.ts
import { Component, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent {
  @Input() titulo = 'Diário de Leitura';
  modoEscuroAtivo = false;
  emailUsuario: string | null = null;
  nomeUsuario: string | null = null;

  constructor(
    private theme: ThemeService,
    private authService: AuthService,
    private auth: Auth,
    private perfilService: PerfilService
  ) {}

  ngOnInit(){
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.emailUsuario = user.email;

        const perfil = await this.perfilService.obterPerfil();
        if (perfil && perfil['nome']) {
          this.nomeUsuario = perfil['nome'];
        }
      }
    });
    const darkMode = localStorage.getItem('darkMode') === 'true';
    this.modoEscuroAtivo = darkMode;
    document.body.classList.toggle('dark', darkMode);
  }

  alternarModoEscuro() {
    this.modoEscuroAtivo = !this.modoEscuroAtivo;

    document.body.classList.toggle('dark', this.modoEscuroAtivo);
    localStorage.setItem('darkMode', this.modoEscuroAtivo.toString())
  }

  logout() {
    this.authService.logout();
  }
}
