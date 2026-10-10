import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { RoleStore } from '@pos-frontend/roles/data-access';
import { UserStore } from '@pos-frontend/users/data-access';

import { ViewUserRolesComponent } from './view-user-roles.component';

describe('ViewUserRolesComponent', () => {
  let component: ViewUserRolesComponent;
  let fixture: ComponentFixture<ViewUserRolesComponent>;
  const roleStore = { roles: () => [], getManyLoading: () => false, getAllRoles: jest.fn() };
  const userStore = {
    user: () => undefined,
    assignRolesLoading: () => false,
    getOneLoading: () => false,
    getUser: jest.fn(),
    assignUserRoles: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserRolesComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: RoleStore, useValue: roleStore },
        { provide: UserStore, useValue: userStore },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ userId: '1' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the roles and the user', () => {
    expect(roleStore.getAllRoles).toHaveBeenCalled();
    expect(userStore.getUser).toHaveBeenCalledWith({ id: '1' });
  });

  it('assigns the saved roles to the user', () => {
    fixture.nativeElement.querySelector('button[type=button]').click();
    expect(userStore.assignUserRoles).toHaveBeenCalledWith({
      data: { userId: '1', roles: [] },
      callback: expect.any(Function),
    });
  });
});
