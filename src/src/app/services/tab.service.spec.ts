import { TestBed } from '@angular/core/testing';

import { TabsService } from './tab.service';

describe('TabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabsService = TestBed.get(TabsService);
    expect(service).toBeTruthy();
  });
});
