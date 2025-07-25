import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { EstantePageRoutingModule } from './estante-routing.module';

import { EstantePage } from './estante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EstantePageRoutingModule
  ],
  declarations: [EstantePage]
})
export class EstantePageModule {}
