import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { CriarMetaModalComponent } from 'src/app/components/modals/criar-meta-modal/criar-meta-modal.component';
import { MetaPageRoutingModule } from './meta-routing.module';
import { MetaPage } from './meta.page';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MetaPageRoutingModule,
  ],
  declarations: [
    MetaPage,
    CriarMetaModalComponent
  ]
})
export class MetaPageModule {}
