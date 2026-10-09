import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import type { CreateSaleRequest } from '@pos-frontend/pos/data-access';
import type { ProductsEntity } from '@pos-frontend/products/data-access';

import type { TenderFormValue } from '../tender-form/tender-form.component';
import { PosFormComponent } from './pos-form.component';

const product: ProductsEntity = {
  id: 7,
  name: 'Sugar',
  code: 'SUG',
  barcode: '',
  active: true,
  price: [{ value: 2, effectiveDate: new Date(0) }],
  cost: [{ value: 1, effectiveDate: new Date(0) }],
  taxable: 'YES',
  quantity: 10,
  reorderLevel: 0,
  mass: '',
  measuredIn: '',
  createdAt: '',
  updatedAt: '',
};

const debtor: DebtorsEntity = {
  id: 3,
  name: 'Cash',
  account: 'CASH',
  discount: 0,
  currency: {
    id: 1,
    name: 'US Dollar',
    rate: [{ value: 1, effectiveDate: '' }],
  },
  createdAt: '',
  updatedAt: '',
};

describe('PosFormComponent', () => {
  let component: PosFormComponent;
  let fixture: ComponentFixture<PosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PosFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('products', [product]);
    fixture.componentRef.setInput('debtors', [debtor]);
    fixture.componentRef.setInput('station', '5');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the sale with the tender details for the selected debtor', () => {
    const emitted: CreateSaleRequest[] = [];
    component.submitted.subscribe((sale) => emitted.push(sale));
    // Drive the form the way the template does.
    const host = component as unknown as {
      form: { patchValue(v: object): void };
      debtorControl: { setValue(v: string | number): void };
      addProduct(): void;
      processReceipt(tender: TenderFormValue): void;
    };
    host.debtorControl.setValue(3);
    host.form.patchValue({ code: 'SUG', quantity: 2 });
    host.addProduct();
    host.processReceipt({
      changeDebtor: null,
      changeRate: null,
      changeAmount: null,
    });

    expect(emitted).toHaveLength(1);
    expect(emitted[0]).toMatchObject({
      debtor: 3,
      station: '5',
      rate: 1,
      total: 4,
      transactionType: 1,
      changeDebtor: null,
    });
    expect(emitted[0].products[0]).toMatchObject({
      productId: 7,
      quantity: 2,
      totalAmt: 4,
    });
  });

  it('stamps refunds with transaction type 2', () => {
    fixture.componentRef.setInput('transactionType', 2);
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    const host = component as unknown as {
      form: { patchValue(v: object): void };
      debtorControl: { setValue(v: string | number): void };
      addProduct(): void;
      processReceipt(tender: TenderFormValue): void;
    };
    host.debtorControl.setValue(3);
    host.form.patchValue({ code: 'SUG' });
    host.addProduct();
    host.processReceipt({
      changeDebtor: null,
      changeRate: null,
      changeAmount: null,
    });

    expect(emitted).toHaveBeenCalledWith(
      expect.objectContaining({ transactionType: 2, total: 2 })
    );
  });

  it('clears the till when a new invoice arrives', () => {
    const host = component as unknown as {
      form: { patchValue(v: object): void };
      debtorControl: { setValue(v: string | number): void };
      addProduct(): void;
      items(): unknown[];
    };
    host.debtorControl.setValue(3);
    host.form.patchValue({ code: 'SUG' });
    host.addProduct();
    expect(host.items()).toHaveLength(1);

    fixture.componentRef.setInput('sale', { id: 1, invoiceNumber: 9 });
    fixture.detectChanges();

    expect(host.items()).toHaveLength(0);
  });
});
