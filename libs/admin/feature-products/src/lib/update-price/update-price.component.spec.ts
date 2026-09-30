import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DRAWER_DATA, DrawerRef } from '@pos-frontend/core';
import { ProductStore } from '@pos-frontend/products/data-access';
import { UpdatePriceComponent } from './update-price.component';

describe('UpdatePriceComponent', () => {
  let component: UpdatePriceComponent;
  let fixture: ComponentFixture<UpdatePriceComponent>;
  const store = { updateLoading: () => false, updatePrice: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePriceComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
        { provide: DRAWER_DATA, useValue: { product: { id: 11, name: 'Cola' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends an UpdatePriceRequest and closes on success', () => {
    const el: HTMLElement = fixture.nativeElement;
    const amount = el.querySelector<HTMLInputElement>('#cost-price-amount')!;
    amount.value = '4.5';
    amount.dispatchEvent(new Event('input'));

    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.updatePrice).toHaveBeenCalledWith({
      data: { id: 11, price: 4.5, effectiveDate: '' },
      callback: expect.any(Function),
    });
    store.updatePrice.mock.calls[0][0].callback();
    expect(drawerRef.close).toHaveBeenCalledWith(true);
  });
});
