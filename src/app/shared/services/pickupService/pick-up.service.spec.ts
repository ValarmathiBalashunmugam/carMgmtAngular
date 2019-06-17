import { TestBed } from '@angular/core/testing';

import { PickUpService } from './pick-up.service';

describe('PickUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickUpService = TestBed.get(PickUpService);
    expect(service).toBeTruthy();
  });
});
