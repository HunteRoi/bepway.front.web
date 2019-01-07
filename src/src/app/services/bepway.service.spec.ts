import { TestBed } from '@angular/core/testing';

import { BepwayService } from './bepway.service';

describe('BepwayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BepwayService = TestBed.get(BepwayService);
    expect(service).toBeTruthy();
  });
});
