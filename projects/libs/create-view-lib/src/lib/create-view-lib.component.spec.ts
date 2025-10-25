import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateViewLibComponent } from './create-view-lib.component';

describe('CreateViewLibComponent', () => {
  let component: CreateViewLibComponent;
  let fixture: ComponentFixture<CreateViewLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateViewLibComponent]
    });
    fixture = TestBed.createComponent(CreateViewLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
