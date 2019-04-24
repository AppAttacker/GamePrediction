import { TestBed } from '@angular/core/testing';

import { IdleTimeOutService } from './idle-time-out.service';

describe('IdleTimeOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdleTimeOutService = TestBed.get(IdleTimeOutService);
    expect(service).toBeTruthy();
  });
});
