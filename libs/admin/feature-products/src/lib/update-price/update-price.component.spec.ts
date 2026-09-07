import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { UpdatePriceComponent } from './update-price.component';

describe('UpdatePriceComponent', () => {
  let component: UpdatePriceComponent;
  let fixture: ComponentFixture<UpdatePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdatePriceComponent],
    providers: [
      provideNoopAnimations(),
      { provide: ProductStore, useValue: { updateLoading: () => false, updatePrice: () => undefined } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { product: {} } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdatePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
