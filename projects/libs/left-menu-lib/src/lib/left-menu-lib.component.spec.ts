import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuLibComponent } from './left-menu-lib.component';

describe('LeftMenuLibComponent', () => {
  let component: LeftMenuLibComponent;
  let fixture: ComponentFixture<LeftMenuLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftMenuLibComponent]
    });
    fixture = TestBed.createComponent(LeftMenuLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
