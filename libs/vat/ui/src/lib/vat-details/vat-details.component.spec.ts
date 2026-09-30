import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { type VatEntity } from '@pos-frontend/vat/data-access';

import { VatDetailsComponent } from './vat-details.component';

describe('VatDetailsComponent', () => {
  let component: VatDetailsComponent;
  let fixture: ComponentFixture<VatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lists the displayable fields and hides the id', () => {
    const vat: VatEntity = { id: 1, vat: 15, createdAt: '2026-01-01', updatedAt: '' };
    fixture.componentRef.setInput('vat', vat);
    fixture.detectChanges();
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Vat');
    expect(text).toContain('15');
    expect(text).toContain('Created At');
    expect(text).not.toContain('Id');
  });
});
