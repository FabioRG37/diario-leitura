import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConquistasPageRoutingModule } from './conquistas-routing.module';
import { ConquistasPage } from './conquistas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ConquistasPageRoutingModule
  ],
  declarations: [ConquistasPage]
})
export class ConquistasPageModule {}
