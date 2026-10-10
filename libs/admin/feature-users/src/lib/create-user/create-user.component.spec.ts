import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type UsersEntity, UserStore } from '@pos-frontend/users/data-access';

import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let fixture: ComponentFixture<CreateUserComponent>;
  const store = {
    createLoading: () => false,
    updateLoading: () => false,
    createUser: jest.fn(),
    updateUser: jest.fn(),
  };
  const user: UsersEntity = {
    id: 3,
    username: 'jdoe',
    name: 'John Doe',
    active: true,
    locked: false,
    roles: [],
    createdBy: '',
    createdDate: '',
    lastModifiedBy: '',
    lastModifiedDate: '',
    version: 0,
  };

  async function setup(data?: UsersEntity): Promise<HTMLElement> {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateUserComponent],
      providers: [
        provideNoopAnimations(),
        { provide: UserStore, useValue: store },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { user: data } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  function setValue(el: HTMLElement, id: string, value: string): void {
    const input = el.querySelector<HTMLInputElement>(`#${id}`)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  async function submit(el: HTMLElement): Promise<void> {
    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('creates the user through the store', async () => {
    const el = await setup();
    setValue(el, 'user-username', 'jdoe');
    setValue(el, 'user-name', 'John Doe');
    setValue(el, 'user-password', 'secret');
    await submit(el);

    expect(store.createUser).toHaveBeenCalledWith({
      data: { username: 'jdoe', name: 'John Doe', password: 'secret' },
      callback: expect.any(Function),
    });
  });

  it('shows errors and does not submit an empty form', async () => {
    const el = await setup();
    await submit(el);

    expect(store.createUser).not.toHaveBeenCalled();
    expect(el.textContent).toContain('Username is required');
    expect(el.textContent).toContain('Password is required');
  });

  it('updates an existing user without requiring a password', async () => {
    const el = await setup(user);
    setValue(el, 'user-name', 'Jane Doe');
    await submit(el);

    expect(store.updateUser).toHaveBeenCalledWith({
      data: { id: 3, username: 'jdoe', name: 'Jane Doe', password: undefined },
      callback: expect.any(Function),
    });
  });
});
