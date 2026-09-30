import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DrawerRef } from '@pos-frontend/core';
import { CreditorStore } from '@pos-frontend/creditors/data-access';

import { CreateCreditorsComponent } from './create-creditors.component';

describe('CreateCreditorsComponent', () => {
  let component: CreateCreditorsComponent;
  let fixture: ComponentFixture<CreateCreditorsComponent>;
  const store = { createLoading: () => false, createCreditor: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateCreditorsComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: CreditorStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCreditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates the creditor and closes the drawer on success', () => {
    const el: HTMLElement = fixture.nativeElement;
    const set = (selector: string, value: string): void => {
      const input = el.querySelector<HTMLInputElement>(selector)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    set('#creditor-account', 'ACC1');
    set('#creditor-name', 'Acme');
    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.createCreditor).toHaveBeenCalledWith({
      data: { account: 'ACC1', name: 'Acme', address: '', description: '' },
      callback: expect.any(Function),
    });
    store.createCreditor.mock.calls[0][0].callback();
    expect(drawerRef.close).toHaveBeenCalledWith(true);
  });
});
