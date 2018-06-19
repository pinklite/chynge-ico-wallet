import { TestBed, async, inject } from '@angular/core/testing';

import { ApprovedGuard } from './approved.guard';

describe('ApprovedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovedGuard]
    });
  });

  it('should ...', inject([ApprovedGuard], (guard: ApprovedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
