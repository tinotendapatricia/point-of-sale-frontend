import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DrawerRef } from '@pos-frontend/core';
import { UserStore } from '@pos-frontend/users/data-access';

import { UpdateUserComponent } from './update-user.component';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  const store = { updateLoading: () => false, updateUser: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserComponent],
      providers: [
        provideNoopAnimations(),
        { provide: UserStore, useValue: store },
        {
          provide: DrawerRef,
          useValue: {
            data: { id: 1, username: 'jdoe', name: 'John Doe' },
            close: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('merges the user id into the update request', () => {
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(store.updateUser).toHaveBeenCalledWith({
      data: { id: 1, username: 'jdoe', name: 'John Doe', password: undefined },
      callback: expect.any(Function),
    });
  });
});
