import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type CreditorsEntity } from '@pos-frontend/creditors/data-access';

import { CreditorsFormComponent } from './creditors-form.component';

describe('CreditorsFormComponent', () => {
  let component: CreditorsFormComponent;
  let fixture: ComponentFixture<CreditorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditorsFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditorsFormComponent);
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

  it('emits the edited values of the given creditor', () => {
    const creditor: CreditorsEntity = {
      id: 1,
      account: 'ACC1',
      name: 'Acme',
      address: 'Harare',
      contact: '',
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('creditor', creditor);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({ account: 'ACC1', name: 'Acme', address: 'Harare', description: '' });
  });
});
