import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockTakeCountFormComponent } from './stock-take-count-form.component';

describe('StockTakeCountFormComponent', () => {
  let component: StockTakeCountFormComponent;
  let fixture: ComponentFixture<StockTakeCountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StockTakeCountFormComponent],
}).compileComponents();

    fixture = TestBed.createComponent(StockTakeCountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
