import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router, private menuCtrl: MenuController) {}

  navegarPara(caminho: string) {
    this.router.navigate([caminho]).then(() => {
      this.menuCtrl.close();
    });
  }
}
