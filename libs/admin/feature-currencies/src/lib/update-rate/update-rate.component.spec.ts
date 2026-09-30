import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DRAWER_DATA, DrawerRef } from '@pos-frontend/core';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { UpdateRateComponent } from './update-rate.component';

describe('UpdateRateComponent', () => {
  let component: UpdateRateComponent;
  let fixture: ComponentFixture<UpdateRateComponent>;
  const store = { updateRateLoading: () => false, updateRate: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRateComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CurrencyStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
        { provide: DRAWER_DATA, useValue: { currency: { id: 3, code: 'ZWG' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the rate for the drawer currency', () => {
    const el: HTMLElement = fixture.nativeElement;
    const rate = el.querySelector<HTMLInputElement>('#rate-value')!;
    rate.value = '25';
    rate.dispatchEvent(new Event('input'));

    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.updateRate).toHaveBeenCalledWith({
      data: { id: 3, rate: 25, effectiveDate: '' },
      callback: expect.any(Function),
    });
  });

  it('closes the drawer on cancel', () => {
    fixture.nativeElement.querySelector('button[type=button]').click();
    expect(drawerRef.close).toHaveBeenCalledWith(false);
  });
});
