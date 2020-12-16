import { TestBed } from '@angular/core/testing';

import { TopsService } from './tops.service';

describe('TopsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopsService = TestBed.get(TopsService);
    expect(service).toBeTruthy();
  });
});
