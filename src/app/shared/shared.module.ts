import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppToolbarComponent } from '../components/app-toolbar/app-toolbar.component';


@NgModule({
  declarations: [AppToolbarComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AppToolbarComponent]
})
export class SharedModule { }
