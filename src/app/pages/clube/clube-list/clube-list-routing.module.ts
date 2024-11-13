import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClubeListPage } from './clube-list.page';


const routes: Routes = [
  {
    path: '',
    component: ClubeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubeListPageRoutingModule {}
