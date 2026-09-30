import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { GroupStore } from '@pos-frontend/groups/data-access';

import { DeleteGroupComponent } from './delete-group.component';

describe('DeleteGroupComponent', () => {
  let component: DeleteGroupComponent;
  let fixture: ComponentFixture<DeleteGroupComponent>;
  const store = { deleteLoading: () => false, deleteGroup: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGroupComponent],
      providers: [
        provideNoopAnimations(),
        { provide: GroupStore, useValue: store },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { group: { id: 'g1', name: 'Cashiers' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deletes the group on confirmation', () => {
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    buttons[buttons.length - 1].click();
    expect(store.deleteGroup).toHaveBeenCalledWith({ data: 'g1', callback: expect.any(Function) });
  });
});
