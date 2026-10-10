import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RoleStore } from '@pos-frontend/roles/data-access';

import { DeleteRoleComponent } from './delete-role.component';

describe('DeleteRoleComponent', () => {
  let fixture: ComponentFixture<DeleteRoleComponent>;
  const store = { deleteLoading: () => false, deleteRole: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRoleComponent],
      providers: [
        provideNoopAnimations(),
        { provide: RoleStore, useValue: store },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { role: { id: 'r1', name: 'VIEW_REPORTS', createdBy: '' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteRoleComponent);
    fixture.detectChanges();
  });

  it('deletes the role on confirm', () => {
    const buttons = fixture.nativeElement.querySelectorAll('mat-dialog-actions button');
    buttons[buttons.length - 1].click();
    expect(store.deleteRole).toHaveBeenCalledWith({ data: 'r1', callback: expect.any(Function) });
  });
});
