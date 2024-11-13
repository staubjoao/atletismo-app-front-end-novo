import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SessaoTreinoListPageRoutingModule } from './sessao-treino-list-routing.module';
import { SessaoTreinoListPage } from './sessao-treino-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessaoTreinoListPageRoutingModule
  ],
  declarations: [SessaoTreinoListPage]
})
export class SessaoTreinoListPageModule {}
