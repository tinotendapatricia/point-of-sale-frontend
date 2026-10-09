import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { DebtorsEntity } from '@pos-frontend/debtors/data-access';

import { TenderFormComponent } from './tender-form.component';

const rand: DebtorsEntity = {
  id: 4,
  name: 'Cash ZAR',
  account: 'ZAR',
  discount: 0,
  currency: {
    id: 2,
    name: 'Rand',
    rate: [{ value: 18, effectiveDate: '' }],
  },
  createdAt: '',
  updatedAt: '',
};

describe('TenderFormComponent', () => {
  let component: TenderFormComponent;
  let fixture: ComponentFixture<TenderFormComponent>;
  let emitted: jest.Mock;

  const host = () =>
    component as unknown as {
      form: { patchValue(v: object): void };
      changeDue(): number;
      submit(): void;
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenderFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TenderFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('amountDue', 10);
    fixture.componentRef.setInput('debtors', [rand]);
    fixture.detectChanges();
    emitted = jest.fn();
    component.submitted.subscribe(emitted);
  });

  it('does not submit without an amount tendered', () => {
    host().submit();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits no change details when change is in the sale currency', () => {
    host().form.patchValue({ amountOffered: 15 });
    expect(host().changeDue()).toBe(5);

    host().submit();
    expect(emitted).toHaveBeenCalledWith({
      changeDebtor: null,
      changeRate: null,
      changeAmount: null,
    });
  });

  it('converts the change into the chosen change account currency', () => {
    host().form.patchValue({
      amountOffered: 15,
      foreignChange: true,
      changeDebtor: 4,
    });

    host().submit();
    expect(emitted).toHaveBeenCalledWith({
      changeDebtor: 4,
      changeRate: 18,
      changeAmount: 90,
    });
  });

  it('requires a change account for foreign change', () => {
    host().form.patchValue({ amountOffered: 15, foreignChange: true });
    host().submit();
    expect(emitted).not.toHaveBeenCalled();
  });
});
