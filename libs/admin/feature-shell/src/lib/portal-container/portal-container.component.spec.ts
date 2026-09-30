import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthStore } from '@pos-frontend/auth/data-access';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { PortalContainerComponent } from './portal-container.component';

describe('PortalContainerComponent', () => {
  let component: PortalContainerComponent;
  let fixture: ComponentFixture<PortalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PortalContainerComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      { provide: AuthStore, useValue: { logout: () => undefined } },
      {
        provide: CurrencyStore,
        useValue: { defaultCurrency: () => undefined, getDefaultCurrency: () => undefined },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(PortalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
