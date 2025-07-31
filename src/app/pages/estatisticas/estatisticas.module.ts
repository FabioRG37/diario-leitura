import { NgModule } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { EstatisticasPageRoutingModule } from './estatisticas-routing.module';

import { EstatisticasPage } from './estatisticas.page';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    EstatisticasPageRoutingModule,
    BaseChartDirective
  ],
  declarations: [EstatisticasPage]
})
export class EstatisticasPageModule {}
