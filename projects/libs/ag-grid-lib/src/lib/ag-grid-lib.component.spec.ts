import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridLibComponent } from './ag-grid-lib.component';

describe('AgGridLibComponent', () => {
  let component: AgGridLibComponent;
  let fixture: ComponentFixture<AgGridLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgGridLibComponent]
    });
    fixture = TestBed.createComponent(AgGridLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
