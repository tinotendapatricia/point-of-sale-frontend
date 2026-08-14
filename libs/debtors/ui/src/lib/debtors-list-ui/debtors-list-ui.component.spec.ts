import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebtorsListUiComponent } from './debtors-list-ui.component';

describe('DebtorsListUiComponent', () => {
  let component: DebtorsListUiComponent;
  let fixture: ComponentFixture<DebtorsListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebtorsListUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtorsListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
