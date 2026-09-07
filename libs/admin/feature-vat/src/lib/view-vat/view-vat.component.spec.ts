import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { VatFacade } from '@pos-frontend/vat/data-access';

import { ViewVatComponent } from './view-vat.component';

describe('ViewVatComponent', () => {
  let component: ViewVatComponent;
  let fixture: ComponentFixture<ViewVatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ViewVatComponent],
    providers: [
      provideNoopAnimations(),
      { provide: VatFacade, useValue: { getVat: () => undefined, selectedVat$: of(undefined) } },
    ],
})
    .compileComponents();

    fixture = TestBed.createComponent(ViewVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
