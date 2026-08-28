import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockTakeContainerComponent } from './stock-take-container.component';

describe('StockTakeContainerComponent', () => {
  let component: StockTakeContainerComponent;
  let fixture: ComponentFixture<StockTakeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StockTakeContainerComponent],
}).compileComponents();

    fixture = TestBed.createComponent(StockTakeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
