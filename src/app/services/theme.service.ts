// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor() {
    const dark = localStorage.getItem('modo-escuro') === 'true';
    dark ? this.enableDark() : this.enableLight();
  }

  enableDark() {
    document.body.classList.add('dark');
    localStorage.setItem('modo-escuro', 'true');
  }

  enableLight() {
    document.body.classList.remove('dark');
    localStorage.setItem('modo-escuro', 'false');
  }

  toggleDark() {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    localStorage.setItem('modo-escuro', dark.toString());
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}
