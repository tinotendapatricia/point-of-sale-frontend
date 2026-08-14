import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakBulkFormComponent } from './break-bulk-form.component';

describe('BreakBulkFormComponent', () => {
  let component: BreakBulkFormComponent;
  let fixture: ComponentFixture<BreakBulkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakBulkFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakBulkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
