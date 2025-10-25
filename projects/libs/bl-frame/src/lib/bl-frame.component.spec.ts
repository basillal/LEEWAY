import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlFrameComponent } from './bl-frame.component';

describe('BlFrameComponent', () => {
  let component: BlFrameComponent;
  let fixture: ComponentFixture<BlFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlFrameComponent]
    });
    fixture = TestBed.createComponent(BlFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
