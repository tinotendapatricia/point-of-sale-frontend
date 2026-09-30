import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { GroupStore } from '@pos-frontend/groups/data-access';

import { CreateGroupComponent } from './create-group.component';

describe('CreateGroupComponent', () => {
  let component: CreateGroupComponent;
  let fixture: ComponentFixture<CreateGroupComponent>;
  const store = { createLoading: () => false, createGroup: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGroupComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: GroupStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates the group through the store', () => {
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector<HTMLInputElement>('#group-name')!;
    input.value = 'Cashiers';
    input.dispatchEvent(new Event('input'));
    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.createGroup).toHaveBeenCalledWith({
      data: { name: 'Cashiers' },
      callback: expect.any(Function),
    });
  });
});
