import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ClubeListPage } from './clube-list.page';
import { ClubeListPageRoutingModule } from './clube-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubeListPageRoutingModule
  ],
  declarations: [ClubeListPage]
})
export class ClubeListPageModule {}
