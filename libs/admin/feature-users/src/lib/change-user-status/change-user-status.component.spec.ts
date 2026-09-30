import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { UserStore } from '@pos-frontend/users/data-access';

import { ChangeUserStatusComponent } from './change-user-status.component';

describe('ChangeUserStatusComponent', () => {
  let component: ChangeUserStatusComponent;
  let fixture: ComponentFixture<ChangeUserStatusComponent>;
  const store = { changeStatusLoading: () => false, changeUserStatus: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeUserStatusComponent],
      providers: [
        provideNoopAnimations(),
        { provide: UserStore, useValue: store },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { user: { id: 1, active: true } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles the user status', () => {
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    buttons[buttons.length - 1].click();
    expect(store.changeUserStatus).toHaveBeenCalledWith({
      data: { userId: 1, status: false },
      callback: expect.any(Function),
    });
  });
});
