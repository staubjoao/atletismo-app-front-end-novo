import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingScheduleListPage } from './training-schedule-list.page';

describe('TrainingScheduleListPage', () => {
  let component: TrainingScheduleListPage;
  let fixture: ComponentFixture<TrainingScheduleListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingScheduleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
