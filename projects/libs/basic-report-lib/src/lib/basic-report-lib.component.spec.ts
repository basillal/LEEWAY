import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicReportLibComponent } from './basic-report-lib.component';

describe('BasicReportLibComponent', () => {
  let component: BasicReportLibComponent;
  let fixture: ComponentFixture<BasicReportLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicReportLibComponent]
    });
    fixture = TestBed.createComponent(BasicReportLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
