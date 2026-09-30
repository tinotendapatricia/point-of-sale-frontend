import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { VatStore } from '@pos-frontend/vat/data-access';

import { ViewVatComponent } from './view-vat.component';

describe('ViewVatComponent', () => {
  let component: ViewVatComponent;
  let fixture: ComponentFixture<ViewVatComponent>;
  const store = { vat: () => undefined, getOneLoading: () => false, getVat: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [ViewVatComponent],
      providers: [provideNoopAnimations(), { provide: VatStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the VAT setting', () => {
    expect(store.getVat).toHaveBeenCalled();
  });
});
