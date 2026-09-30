import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DebtorStore } from '@pos-frontend/debtors/data-access';

import { ListDebtorsComponent } from './list-debtors.component';

describe('ListDebtorsComponent', () => {
  let component: ListDebtorsComponent;
  let fixture: ComponentFixture<ListDebtorsComponent>;
  const store = {
    paginatedDebtors: () => [],
    totalDebtors: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedDebtors: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [ListDebtorsComponent],
      providers: [provideRouter([]), provideNoopAnimations(), { provide: DebtorStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedDebtors).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
