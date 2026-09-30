import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type VatEntity } from '@pos-frontend/vat/data-access';

import { VatFormComponent } from './vat-form.component';

describe('VatFormComponent', () => {
  let component: VatFormComponent;
  let fixture: ComponentFixture<VatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(VatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the edited VAT percentage', () => {
    const vat: VatEntity = { id: 1, vat: 15, createdAt: '', updatedAt: '' };
    fixture.componentRef.setInput('vat', vat);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({ vat: 15 });
  });

  it('emits cancelled', () => {
    const cancelled = jest.fn();
    component.cancelled.subscribe(cancelled);
    fixture.nativeElement.querySelector('button[type=button]').click();
    expect(cancelled).toHaveBeenCalled();
  });
});
