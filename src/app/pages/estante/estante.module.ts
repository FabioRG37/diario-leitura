import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstantePageRoutingModule } from './estante-routing.module';

import { EstantePage } from './estante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstantePageRoutingModule
  ],
  declarations: [EstantePage]
})
export class EstantePageModule {}
