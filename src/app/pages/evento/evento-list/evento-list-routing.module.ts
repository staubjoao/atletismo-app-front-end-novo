import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoListPage } from './evento-list.page';


const routes: Routes = [
  {
    path: '',
    component: EventoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoListPageRoutingModule {}
