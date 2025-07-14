import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesLivroPageRoutingModule } from './detalhes-livro-routing.module';

import { DetalhesLivroPage } from './detalhes-livro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesLivroPageRoutingModule
  ],
  declarations: [DetalhesLivroPage]
})
export class DetalhesLivroPageModule {}
