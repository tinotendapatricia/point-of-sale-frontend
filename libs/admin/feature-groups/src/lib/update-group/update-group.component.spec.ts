import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DrawerRef } from '@pos-frontend/core';
import { GroupStore } from '@pos-frontend/groups/data-access';

import { UpdateGroupComponent } from './update-group.component';

describe('UpdateGroupComponent', () => {
  let component: UpdateGroupComponent;
  let fixture: ComponentFixture<UpdateGroupComponent>;
  const store = { updateLoading: () => false, updateGroup: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGroupComponent],
      providers: [
        provideNoopAnimations(),
        { provide: GroupStore, useValue: store },
        { provide: DrawerRef, useValue: { data: { id: 'g1', name: 'Cashiers', roles: [] }, close: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('merges the group id into the update request', () => {
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(store.updateGroup).toHaveBeenCalledWith({
      data: { id: 'g1', name: 'Cashiers' },
      callback: expect.any(Function),
    });
  });
});
