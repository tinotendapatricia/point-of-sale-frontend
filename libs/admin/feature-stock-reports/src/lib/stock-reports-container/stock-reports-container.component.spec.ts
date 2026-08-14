import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockReportsContainerComponent } from './stock-reports-container.component';

describe('StockReportsContainerComponent', () => {
  let component: StockReportsContainerComponent;
  let fixture: ComponentFixture<StockReportsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockReportsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
