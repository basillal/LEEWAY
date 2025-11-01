import { TestBed } from '@angular/core/testing';

import { SharedAuthService } from './shared-auth.service';

describe('SharedAuthService', () => {
  let service: SharedAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
