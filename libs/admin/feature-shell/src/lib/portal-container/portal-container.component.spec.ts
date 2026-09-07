import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
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
      { provide: AuthFacade, useValue: { logout: () => undefined } },
      {
        provide: CurrenciesFacade,
        useValue: { defaultCurrency$: of(undefined), getDefaultCurrency: () => undefined },
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
