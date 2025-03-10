import { TestBed } from '@angular/core/testing';

import { LeftMenuLibService } from './left-menu-lib.service';

describe('LeftMenuLibService', () => {
  let service: LeftMenuLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftMenuLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
