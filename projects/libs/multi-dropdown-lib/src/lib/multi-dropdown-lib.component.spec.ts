import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDropdownLibComponent } from './multi-dropdown-lib.component';

describe('MultiDropdownLibComponent', () => {
  let component: MultiDropdownLibComponent;
  let fixture: ComponentFixture<MultiDropdownLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiDropdownLibComponent]
    });
    fixture = TestBed.createComponent(MultiDropdownLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
