import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DrawerRef } from '@pos-frontend/core';
import { type RolesEntity, RoleStore } from '@pos-frontend/roles/data-access';

import { CreateRoleComponent } from './create-role.component';

describe('CreateRoleComponent', () => {
  let fixture: ComponentFixture<CreateRoleComponent>;
  const store = {
    createLoading: () => false,
    updateLoading: () => false,
    createRole: jest.fn(),
    updateRole: jest.fn(),
  };

  async function setup(data?: RolesEntity): Promise<HTMLElement> {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateRoleComponent],
      providers: [
        provideNoopAnimations(),
        { provide: RoleStore, useValue: store },
        { provide: DrawerRef, useValue: { data, close: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRoleComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  async function submit(el: HTMLElement): Promise<void> {
    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('creates a role', async () => {
    const el = await setup();
    const input = el.querySelector<HTMLInputElement>('#role-name')!;
    input.value = 'MANAGE_USERS';
    input.dispatchEvent(new Event('input'));
    await submit(el);

    expect(store.createRole).toHaveBeenCalledWith({
      data: { name: 'MANAGE_USERS' },
      callback: expect.any(Function),
    });
  });

  it('requires a name', async () => {
    const el = await setup();
    await submit(el);

    expect(store.createRole).not.toHaveBeenCalled();
    expect(el.textContent).toContain('Name is required');
  });

  it('updates an existing role', async () => {
    await setup({ id: 'r1', name: 'VIEW_REPORTS', createdBy: 'admin' });
    await submit(fixture.nativeElement);

    expect(store.updateRole).toHaveBeenCalledWith({
      data: { id: 'r1', name: 'VIEW_REPORTS' },
      callback: expect.any(Function),
    });
  });
});
