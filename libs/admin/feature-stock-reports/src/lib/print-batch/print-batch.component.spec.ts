import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintBatchComponent } from './print-batch.component';

describe('PrintBatchComponent', () => {
  let component: PrintBatchComponent;
  let fixture: ComponentFixture<PrintBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PrintBatchComponent],
}).compileComponents();

    fixture = TestBed.createComponent(PrintBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
