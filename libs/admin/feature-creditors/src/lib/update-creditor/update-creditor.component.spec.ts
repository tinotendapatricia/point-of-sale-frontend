import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DRAWER_DATA, DrawerRef } from '@pos-frontend/core';
import { type CreditorsEntity, CreditorStore } from '@pos-frontend/creditors/data-access';

import { UpdateCreditorComponent } from './update-creditor.component';

describe('UpdateCreditorComponent', () => {
  let component: UpdateCreditorComponent;
  let fixture: ComponentFixture<UpdateCreditorComponent>;
  const store = { updateLoading: () => false, updateCreditor: jest.fn() };
  const drawerRef = { close: jest.fn() };
  const creditor: CreditorsEntity = {
    id: 7,
    account: 'ACC7',
    name: 'Acme',
    address: 'Harare',
    contact: '',
    createdAt: '',
    updatedAt: '',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [UpdateCreditorComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CreditorStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
        { provide: DRAWER_DATA, useValue: { creditor } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the creditor with its id and closes the drawer on success', () => {
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(store.updateCreditor).toHaveBeenCalledWith({
      data: { id: 7, account: 'ACC7', name: 'Acme', address: 'Harare', description: '' },
      callback: expect.any(Function),
    });
    store.updateCreditor.mock.calls[0][0].callback();
    expect(drawerRef.close).toHaveBeenCalledWith(true);
  });
});
