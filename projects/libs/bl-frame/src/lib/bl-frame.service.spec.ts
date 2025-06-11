import { TestBed } from '@angular/core/testing';

import { BlFrameService } from './bl-frame.service';

describe('BlFrameService', () => {
  let service: BlFrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlFrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
