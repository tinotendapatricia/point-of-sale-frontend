import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { UserStore } from '@pos-frontend/users/data-access';

import { ViewUserComponent } from './view-user.component';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  const store = { user: () => undefined, getOneLoading: () => false, getUser: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserComponent],
      providers: [
        provideRouter([]),
        { provide: UserStore, useValue: store },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ userId: '1' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the user from the route id', () => {
    expect(store.getUser).toHaveBeenCalledWith({ id: '1' });
  });
});
