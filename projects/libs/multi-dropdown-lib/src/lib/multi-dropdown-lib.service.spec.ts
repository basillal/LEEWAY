import { TestBed } from '@angular/core/testing';

import { MultiDropdownLibService } from './multi-dropdown-lib.service';

describe('MultiDropdownLibService', () => {
  let service: MultiDropdownLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiDropdownLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
