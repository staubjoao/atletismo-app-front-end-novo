import { TestBed } from '@angular/core/testing';

import { TrainingScheduleService } from './training-schedule.service';

describe('TrainingScheduleService', () => {
  let service: TrainingScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
