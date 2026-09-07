import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { UpdateRateComponent } from './update-rate.component';

describe('UpdateRateComponent', () => {
  let component: UpdateRateComponent;
  let fixture: ComponentFixture<UpdateRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateRateComponent],
    providers: [
      provideNoopAnimations(),
      { provide: CurrenciesFacade, useValue: { updateRate: () => undefined, loaded$: of(false) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { currency: {} } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
