import { TestBed } from '@angular/core/testing';

import { RegistrService } from './registr.service';

describe('RegistrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrService = TestBed.get(RegistrService);
    expect(service).toBeTruthy();
  });
});
