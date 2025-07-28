import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaPage } from './meta.page';

const routes: Routes = [
  {
    path: '',
    component: MetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetaPageRoutingModule {}
