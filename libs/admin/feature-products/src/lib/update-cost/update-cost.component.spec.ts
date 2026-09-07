import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { UpdateCostComponent } from './update-cost.component';

describe('UpdateCostComponent', () => {
  let component: UpdateCostComponent;
  let fixture: ComponentFixture<UpdateCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateCostComponent],
    providers: [
      provideNoopAnimations(),
      { provide: ProductStore, useValue: { updateLoading: () => false, updateCost: () => undefined } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { product: {} } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
