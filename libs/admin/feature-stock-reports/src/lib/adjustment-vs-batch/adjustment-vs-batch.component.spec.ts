import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdjustmentVsBatchComponent } from './adjustment-vs-batch.component';

describe('AdjustmentVsBatchComponent', () => {
  let component: AdjustmentVsBatchComponent;
  let fixture: ComponentFixture<AdjustmentVsBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AdjustmentVsBatchComponent],
}).compileComponents();

    fixture = TestBed.createComponent(AdjustmentVsBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
