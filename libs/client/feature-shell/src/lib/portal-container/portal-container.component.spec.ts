import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthStore } from '@pos-frontend/auth/data-access';
import { UserStore } from '@pos-frontend/users/data-access';
import { PortalContainerComponent } from './portal-container.component';

describe('PortalContainerComponent', () => {
  let component: PortalContainerComponent;
  let fixture: ComponentFixture<PortalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalContainerComponent],
      providers: [
        provideRouter([]),
        { provide: AuthStore, useValue: { logout: jest.fn() } },
        {
          provide: UserStore,
          useValue: { profile: () => undefined, getUserProfile: jest.fn() },
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
