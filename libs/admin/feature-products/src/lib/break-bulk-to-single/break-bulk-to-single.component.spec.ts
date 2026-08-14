import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakBulkToSingleComponent } from './break-bulk-to-single.component';

describe('BreakBulkToSingleComponent', () => {
  let component: BreakBulkToSingleComponent;
  let fixture: ComponentFixture<BreakBulkToSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakBulkToSingleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreakBulkToSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
