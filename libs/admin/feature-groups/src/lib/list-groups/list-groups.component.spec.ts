import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { GroupStore } from '@pos-frontend/groups/data-access';

import { ListGroupsComponent } from './list-groups.component';

describe('ListGroupsComponent', () => {
  let component: ListGroupsComponent;
  let fixture: ComponentFixture<ListGroupsComponent>;
  const store = {
    paginatedGroups: () => [],
    totalGroups: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedGroups: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGroupsComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: GroupStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedGroups).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
