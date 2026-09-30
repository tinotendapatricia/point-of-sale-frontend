import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RoleStore } from '@pos-frontend/roles/data-access';

import { ListRolesComponent } from './list-roles.component';

describe('ListRolesComponent', () => {
  let component: ListRolesComponent;
  let fixture: ComponentFixture<ListRolesComponent>;
  const store = {
    paginatedRoles: () => [],
    totalRoles: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedRoles: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRolesComponent],
      providers: [provideNoopAnimations(), { provide: RoleStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedRoles).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
