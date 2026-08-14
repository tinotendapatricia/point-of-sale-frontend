import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockTakeFormComponent } from './stock-take-form.component';

describe('StockTakeFormComponent', () => {
  let component: StockTakeFormComponent;
  let fixture: ComponentFixture<StockTakeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockTakeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
