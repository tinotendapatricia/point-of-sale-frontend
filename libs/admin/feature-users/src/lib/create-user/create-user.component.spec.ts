import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { UserStore } from '@pos-frontend/users/data-access';

import { CreateUserComponent } from './create-user.component';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  const store = { createLoading: () => false, createUser: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: UserStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates the user through the store', () => {
    const el: HTMLElement = fixture.nativeElement;
    const setValue = (id: string, value: string) => {
      const input = el.querySelector<HTMLInputElement>('#' + id)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    setValue('user-username', 'jdoe');
    setValue('user-name', 'John Doe');
    setValue('user-password', 'secret');
    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.createUser).toHaveBeenCalledWith({
      data: { username: 'jdoe', name: 'John Doe', password: 'secret' },
      callback: expect.any(Function),
    });
  });
});
