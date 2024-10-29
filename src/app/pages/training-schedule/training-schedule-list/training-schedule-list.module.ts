import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrainingScheduleListPageRoutingModule } from './training-schedule-list-routing.module';
import { TrainingScheduleListPage } from './training-schedule-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingScheduleListPageRoutingModule
  ],
  declarations: [TrainingScheduleListPage]
})
export class TrainingScheduleListPageModule {}
