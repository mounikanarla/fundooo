import { TestBed } from '@angular/core/testing';

import { GeneralHttpService } from './general-http.service';

describe('GeneralHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralHttpService = TestBed.get(GeneralHttpService);
    expect(service).toBeTruthy();
  });
});
