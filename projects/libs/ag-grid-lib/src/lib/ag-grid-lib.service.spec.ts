import { TestBed } from '@angular/core/testing';

import { AgGridLibService } from './ag-grid-lib.service';

describe('AgGridLibService', () => {
  let service: AgGridLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgGridLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
