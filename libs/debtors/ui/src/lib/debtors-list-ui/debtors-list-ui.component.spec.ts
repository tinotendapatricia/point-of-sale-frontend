import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type DebtorsEntity } from '@pos-frontend/debtors/data-access';

import { DebtorsListUiComponent } from './debtors-list-ui.component';

describe('DebtorsListUiComponent', () => {
  let component: DebtorsListUiComponent;
  let fixture: ComponentFixture<DebtorsListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsListUiComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtorsListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a row per debtor and emits edited', () => {
    const debtor: DebtorsEntity = {
      id: 1,
      name: 'Acme',
      account: 'ACC1',
      discount: 0,
      currency: { id: 3, name: 'USD', rate: [] },
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('debtors', [debtor]);
    fixture.componentRef.setInput('total', 1);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Acme');
    const edited = jest.fn();
    component.edited.subscribe(edited);
    fixture.nativeElement.querySelector('button[aria-label="Edit Acme"]').click();
    expect(edited).toHaveBeenCalledWith(debtor);
  });
});
