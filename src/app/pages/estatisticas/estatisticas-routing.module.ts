import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstatisticasPage } from './estatisticas.page';

const routes: Routes = [
  {
    path: '',
    component: EstatisticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstatisticasPageRoutingModule {}
