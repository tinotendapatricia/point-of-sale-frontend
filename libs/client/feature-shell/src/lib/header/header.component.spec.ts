import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthStore } from '@pos-frontend/auth/data-access';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { UserStore } from '@pos-frontend/users/data-access';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  const authStore = { logout: jest.fn() };
  const userStore = {
    profile: () => ({ name: 'Jane Till' }),
    getUserProfile: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        {
          provide: CurrencyStore,
          useValue: { defaultCurrency: () => ({ code: 'USD' }) },
        },
        { provide: AuthStore, useValue: authStore },
        { provide: UserStore, useValue: userStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('loads and shows the signed-in user', () => {
    expect(userStore.getUserProfile).toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('Jane Till');
    expect(fixture.nativeElement.textContent).toContain('USD');
  });

  it('logs out', () => {
    fixture.nativeElement.querySelector('button').click();
    expect(authStore.logout).toHaveBeenCalled();
  });
});
