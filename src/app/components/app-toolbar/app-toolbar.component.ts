// src/app/components/app-toolbar/app-toolbar.component.ts
import { Component, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent {
  @Input() titulo = 'Diário de Leitura';
  modoEscuroAtivo = false;
  emailUsuario: string | null = null;

  constructor(
    private theme: ThemeService,
    private authService: AuthService,
    private auth: Auth
  ) {}

  ngOnInit(){
    this.auth.onAuthStateChanged(user => {
      this.emailUsuario = user?.email ?? null;
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
