import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CreditorStore } from '@pos-frontend/creditors/data-access';

import { ListCreditorsComponent } from './list-creditors.component';

describe('ListCreditorsComponent', () => {
  let component: ListCreditorsComponent;
  let fixture: ComponentFixture<ListCreditorsComponent>;
  const store = {
    paginatedCreditors: () => [],
    totalCreditors: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedCreditors: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [ListCreditorsComponent],
      providers: [provideRouter([]), provideNoopAnimations(), { provide: CreditorStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCreditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedCreditors).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
