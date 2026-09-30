import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type DebtorsEntity } from '@pos-frontend/debtors/data-access';

import { DebtorsFormComponent } from './debtors-form.component';

describe('DebtorsFormComponent', () => {
  let component: DebtorsFormComponent;
  let fixture: ComponentFixture<DebtorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not emit while required fields are empty', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the edited values with the currency id', () => {
    const debtor: DebtorsEntity = {
      id: 1,
      name: 'Acme',
      account: 'ACC1',
      discount: 5,
      currency: { id: 3, name: 'USD', rate: [] },
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('debtor', debtor);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({ name: 'Acme', account: 'ACC1', currency: 3, discount: 5 });
  });
});
