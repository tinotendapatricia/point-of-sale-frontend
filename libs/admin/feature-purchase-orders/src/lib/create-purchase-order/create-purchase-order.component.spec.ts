import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { PurchaseOrderFacade } from '@pos-frontend/purchase-orders/data-access';
import { VatFacade } from '@pos-frontend/vat/data-access';
import { CreatePurchaseOrderComponent } from './create-purchase-order.component';

describe('CreatePurchaseOrderComponent', () => {
  let component: CreatePurchaseOrderComponent;
  let fixture: ComponentFixture<CreatePurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreatePurchaseOrderComponent],
    providers: [
      { provide: ProductsFacade, useValue: { getAllProducts: () => undefined, allProducts$: of([]) } },
      { provide: VatFacade, useValue: {} },
      { provide: CreditorsFacade, useValue: { getAllCreditors: () => undefined, allCreditors$: of([]) } },
      {
        provide: PurchaseOrderFacade,
        useValue: { selectedPurchaseOrder$: of(undefined), createNewPurchaseOrder: () => undefined },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreatePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
