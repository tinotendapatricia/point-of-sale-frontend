import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { GroupStore } from '@pos-frontend/groups/data-access';
import { RoleStore } from '@pos-frontend/roles/data-access';

import { ViewGroupAuthoritiesComponent } from './view-group-authorities.component';

describe('ViewGroupAuthoritiesComponent', () => {
  let component: ViewGroupAuthoritiesComponent;
  let fixture: ComponentFixture<ViewGroupAuthoritiesComponent>;
  const roleStore = { roles: () => [], getAllRoles: jest.fn() };
  const groupStore = {
    group: () => undefined,
    assignRolesLoading: () => false,
    getGroup: jest.fn(),
    assignGroupRoles: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGroupAuthoritiesComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: GroupStore, useValue: groupStore },
        { provide: RoleStore, useValue: roleStore },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ groupId: 'g1' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewGroupAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the roles and the group', () => {
    expect(roleStore.getAllRoles).toHaveBeenCalled();
    expect(groupStore.getGroup).toHaveBeenCalledWith({ id: 'g1' });
  });

  it('assigns the saved roles to the group', () => {
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    buttons[buttons.length - 1].click();
    expect(groupStore.assignGroupRoles).toHaveBeenCalledWith({
      data: { groupId: 'g1', roles: [] },
      callback: expect.any(Function),
    });
  });
});
