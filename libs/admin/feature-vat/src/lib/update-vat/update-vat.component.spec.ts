import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DrawerRef } from '@pos-frontend/core';
import { type VatEntity, VatStore } from '@pos-frontend/vat/data-access';

import { UpdateVatComponent } from './update-vat.component';

describe('UpdateVatComponent', () => {
  let component: UpdateVatComponent;
  let fixture: ComponentFixture<UpdateVatComponent>;
  const vat: VatEntity = { id: 4, vat: 15, createdAt: '', updatedAt: '' };
  const store = { vat: () => vat, updateLoading: () => false, updateVat: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [UpdateVatComponent],
      providers: [
        provideNoopAnimations(),
        { provide: VatStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the VAT setting and closes the drawer on success', () => {
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(store.updateVat).toHaveBeenCalledWith({ data: vat, callback: expect.any(Function) });
    store.updateVat.mock.calls[0][0].callback();
    expect(drawerRef.close).toHaveBeenCalledWith(true);
  });
});
