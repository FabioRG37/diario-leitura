import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstantePage } from './estante.page';

const routes: Routes = [
  {
    path: '',
    component: EstantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstantePageRoutingModule {}
