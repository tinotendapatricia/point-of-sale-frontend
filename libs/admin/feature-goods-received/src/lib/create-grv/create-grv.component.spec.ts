import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductsFacade } from '@pos-frontend/products/data-access';
import { PurchaseOrderFacade } from '@pos-frontend/purchase-orders/data-access';
import { CreateGrvComponent } from './create-grv.component';

describe('CreateGrvComponent', () => {
  let component: CreateGrvComponent;
  let fixture: ComponentFixture<CreateGrvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateGrvComponent],
    providers: [
      {
        provide: PurchaseOrderFacade,
        useValue: { selectedPurchaseOrder$: of(undefined), getPurchaseOrder: () => undefined, updatePurchaseOrder: () => undefined },
      },
      { provide: ProductsFacade, useValue: { getAllProducts: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreateGrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
