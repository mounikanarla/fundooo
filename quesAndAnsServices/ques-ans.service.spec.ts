import { TestBed } from '@angular/core/testing';

import { QuesAnsService } from './ques-ans.service';

describe('QuesAnsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuesAnsService = TestBed.get(QuesAnsService);
    expect(service).toBeTruthy();
  });
});
