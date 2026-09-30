import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import type { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import type { CreateSaleRequest } from '@pos-frontend/pos/data-access';
import type { ProductsEntity } from '@pos-frontend/products/data-access';

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
      providers: [provideNoopAnimations(), provideRouter([])],
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

  it('emits the sale for the selected debtor', () => {
    const emitted: CreateSaleRequest[] = [];
    component.submitted.subscribe((sale) => emitted.push(sale));
    // Drive the form the way the template does.
    const host = component as unknown as {
      form: { patchValue(v: object): void };
      debtorControl: { setValue(v: string | number): void };
      addProduct(): void;
      processReceipt(): void;
    };
    host.debtorControl.setValue(3);
    host.form.patchValue({ code: 'SUG', quantity: 2 });
    host.addProduct();
    host.processReceipt();

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
});
