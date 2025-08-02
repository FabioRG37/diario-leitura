import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AppToolbarComponent } from '../components/app-toolbar/app-toolbar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [AppToolbarComponent]
})
export class SharedModule { }
