import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingScheduleListPage } from './training-schedule-list.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingScheduleListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingScheduleListPageRoutingModule {}
