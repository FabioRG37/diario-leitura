import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConquistaService } from 'src/app/services/conquista.service';
import { Conquista } from 'src/app/shared/models/conquista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conquistas',
  templateUrl: './conquistas.page.html',
  styleUrls: ['./conquistas.page.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
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
export class ConquistasPage implements OnInit {
  conquistas: Conquista[] = [];

  constructor(private conquistaService: ConquistaService, private router: Router) {}

  ngOnInit() {
    this.conquistas = this.conquistaService.getConquistas();
  }

  async ionViewWillEnter() {
    await this.conquistaService.init();
    this.conquistas = this.conquistaService.getConquistas();
  }

  resetarConquistas() {
    this.conquistaService.resetarConquistas();
    this.conquistaService.getConquistas();
    window.location.reload();
  }

  get haConquistasMarcadas(): boolean {
    return this.conquistas.some(c => c.conquistada);
  }
}
