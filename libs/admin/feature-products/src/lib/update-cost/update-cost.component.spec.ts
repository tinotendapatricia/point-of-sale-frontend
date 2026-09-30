import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DRAWER_DATA, DrawerRef } from '@pos-frontend/core';
import { ProductStore } from '@pos-frontend/products/data-access';
import { UpdateCostComponent } from './update-cost.component';

describe('UpdateCostComponent', () => {
  let component: UpdateCostComponent;
  let fixture: ComponentFixture<UpdateCostComponent>;
  const store = { updateLoading: () => false, updateCost: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCostComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
        { provide: DRAWER_DATA, useValue: { product: { id: 11, name: 'Cola' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends an UpdateCostRequest for the drawer product', () => {
    const el: HTMLElement = fixture.nativeElement;
    const amount = el.querySelector<HTMLInputElement>('#cost-price-amount')!;
    amount.value = '3';
    amount.dispatchEvent(new Event('input'));

    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.updateCost).toHaveBeenCalledWith({
      data: { id: 11, cost: 3, effectiveDate: '' },
      callback: expect.any(Function),
    });
  });
});
