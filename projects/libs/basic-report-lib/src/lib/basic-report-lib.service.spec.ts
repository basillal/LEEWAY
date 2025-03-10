import { TestBed } from '@angular/core/testing';

import { BasicReportLibService } from './basic-report-lib.service';

describe('BasicReportLibService', () => {
  let service: BasicReportLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicReportLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
