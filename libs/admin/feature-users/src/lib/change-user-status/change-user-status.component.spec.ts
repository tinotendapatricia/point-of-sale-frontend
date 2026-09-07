import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UsersFacade } from '@pos-frontend/users/data-access';

import { ChangeUserStatusComponent } from './change-user-status.component';

describe('ChangeUserStatusComponent', () => {
  let component: ChangeUserStatusComponent;
  let fixture: ComponentFixture<ChangeUserStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ChangeUserStatusComponent],
    providers: [
      provideNoopAnimations(),
      { provide: UsersFacade, useValue: { changeUserStatus: () => undefined, loaded$: of(true) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { user: { id: '1', active: true } } },
    ],
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
