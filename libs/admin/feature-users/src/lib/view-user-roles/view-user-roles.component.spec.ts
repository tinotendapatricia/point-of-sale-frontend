import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { RolesFacade } from '@pos-frontend/roles/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';
import { ViewUserRolesComponent } from './view-user-roles.component';

describe('ViewUserRolesComponent', () => {
  let component: ViewUserRolesComponent;
  let fixture: ComponentFixture<ViewUserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ViewUserRolesComponent],
    providers: [
      provideRouter([]),
      { provide: RolesFacade, useValue: { allRoles$: of([]), getAllRoles: () => undefined } },
      { provide: UsersFacade, useValue: { selectedUser$: of(undefined), loaded$: of(false), getUserById: () => undefined, assignUserRoles: () => undefined } },
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
});
