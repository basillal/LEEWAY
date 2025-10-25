import { TestBed } from '@angular/core/testing';

import { CreateViewLibService } from './create-view-lib.service';

describe('CreateViewLibService', () => {
  let service: CreateViewLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateViewLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
