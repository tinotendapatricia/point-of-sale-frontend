import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesByDebtorComponent } from './sales-by-debtor.component';

describe('SalesByDebtorComponent', () => {
  let component: SalesByDebtorComponent;
  let fixture: ComponentFixture<SalesByDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesByDebtorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesByDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
