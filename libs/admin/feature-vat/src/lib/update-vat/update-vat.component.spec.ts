import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { VatFacade } from '@pos-frontend/vat/data-access';

import { UpdateVatComponent } from './update-vat.component';

describe('UpdateVatComponent', () => {
  let component: UpdateVatComponent;
  let fixture: ComponentFixture<UpdateVatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateVatComponent],
    providers: [
      provideNoopAnimations(),
      { provide: VatFacade, useValue: { updateVat: () => undefined, loaded$: of(false), selectedVat$: of(undefined) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
    ],
})
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
