import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventoListPage } from './evento-list.page';
import { EventoListPageRoutingModule } from './evento-list-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoListPageRoutingModule
  ],
  declarations: [EventoListPage]
})
export class EventListPageModule {}
