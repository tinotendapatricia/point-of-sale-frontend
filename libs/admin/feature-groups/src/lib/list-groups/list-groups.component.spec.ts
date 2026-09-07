import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { ListGroupsComponent } from './list-groups.component';

describe('ListGroupsComponent', () => {
  let component: ListGroupsComponent;
  let fixture: ComponentFixture<ListGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListGroupsComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      {
        provide: GroupsFacade,
        useValue: {
          allGroups$: of([]),
          totalGroups$: of(0),
          loading$: of(false),
          getPaginatedGroups: () => undefined,
        },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(ListGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
