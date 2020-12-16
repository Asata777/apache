import { TestBed } from '@angular/core/testing';

import { ModersService } from './moders.service';

describe('ModersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModersService = TestBed.get(ModersService);
    expect(service).toBeTruthy();
  });
});
