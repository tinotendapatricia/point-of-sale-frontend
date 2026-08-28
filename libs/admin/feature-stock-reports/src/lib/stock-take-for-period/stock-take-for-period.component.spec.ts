import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockTakeForPeriodComponent } from './stock-take-for-period.component';

describe('StockTakeForPeriodComponent', () => {
  let component: StockTakeForPeriodComponent;
  let fixture: ComponentFixture<StockTakeForPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StockTakeForPeriodComponent],
}).compileComponents();

    fixture = TestBed.createComponent(StockTakeForPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
