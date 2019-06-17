import { TestBed } from '@angular/core/testing';

import { ServiceCenterService } from './service-center.service';

describe('ServiceCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceCenterService = TestBed.get(ServiceCenterService);
    expect(service).toBeTruthy();
  });
});
