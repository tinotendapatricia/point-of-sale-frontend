import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintAdjustmentComponent } from './print-adjustment.component';

describe('PrintAdjustmentComponent', () => {
  let component: PrintAdjustmentComponent;
  let fixture: ComponentFixture<PrintAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PrintAdjustmentComponent],
}).compileComponents();

    fixture = TestBed.createComponent(PrintAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
