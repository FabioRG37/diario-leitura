import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstatisticasPageRoutingModule } from './estatisticas-routing.module';

import { EstatisticasPage } from './estatisticas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstatisticasPageRoutingModule,
    NgChartsModule
  ],
  declarations: [EstatisticasPage]
})
export class EstatisticasPageModule {}
