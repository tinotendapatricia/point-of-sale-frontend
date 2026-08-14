import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStockBatchComponent } from './create-stock-batch.component';

describe('CreateStockBatchComponent', () => {
  let component: CreateStockBatchComponent;
  let fixture: ComponentFixture<CreateStockBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStockBatchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStockBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
