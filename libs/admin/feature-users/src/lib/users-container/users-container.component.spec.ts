import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { UsersFacade } from '@pos-frontend/users/data-access';

import { UsersContainerComponent } from './users-container.component';

describe('UsersContainerComponent', () => {
  let component: UsersContainerComponent;
  let fixture: ComponentFixture<UsersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UsersContainerComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
      { provide: GroupsFacade, useValue: { allGroups$: of([]), getAllGroups: () => undefined } },
      {
        provide: UsersFacade,
        useValue: {
          allUsers$: of([]),
          totalUsers$: of(0),
          loading$: of(false),
          getPaginatesUsers: () => undefined,
          getPaginatesUsersByGroup: () => undefined,
        },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UsersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
