import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';

import { ListUsersByGroupComponent } from './list-users-by-group.component';

describe('ListUsersByGroupComponent', () => {
  let component: ListUsersByGroupComponent;
  let fixture: ComponentFixture<ListUsersByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListUsersByGroupComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      { provide: GroupsFacade, useValue: { allGroups$: of([]), getAllGroups: () => undefined } },
      {
        provide: UsersFacade,
        useValue: {
          allUsers$: of([]),
          totalUsers$: of(0),
          loading$: of(false),
          getPaginatesUsersByGroup: () => undefined,
        },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(ListUsersByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
