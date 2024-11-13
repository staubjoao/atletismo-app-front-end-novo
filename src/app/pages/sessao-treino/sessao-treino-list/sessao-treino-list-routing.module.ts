import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessaoTreinoListPage } from './sessao-treino-list.page';

const routes: Routes = [
  {
    path: '',
    component: SessaoTreinoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessaoTreinoListPageRoutingModule {}
