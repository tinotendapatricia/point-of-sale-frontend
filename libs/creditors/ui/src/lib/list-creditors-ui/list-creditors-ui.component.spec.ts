import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type CreditorsEntity } from '@pos-frontend/creditors/data-access';

import { ListCreditorsUiComponent } from './list-creditors-ui.component';

describe('ListCreditorsUiComponent', () => {
  let component: ListCreditorsUiComponent;
  let fixture: ComponentFixture<ListCreditorsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCreditorsUiComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCreditorsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a row per creditor and emits edited', () => {
    const creditor: CreditorsEntity = {
      id: 1,
      account: 'ACC1',
      name: 'Acme',
      address: 'Harare',
      contact: '',
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('creditors', [creditor]);
    fixture.componentRef.setInput('total', 1);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Acme');
    const edited = jest.fn();
    component.edited.subscribe(edited);
    fixture.nativeElement.querySelector('button[aria-label="Edit Acme"]').click();
    expect(edited).toHaveBeenCalledWith(creditor);
  });
});
