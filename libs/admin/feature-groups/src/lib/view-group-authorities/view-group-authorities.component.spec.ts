import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { RolesFacade } from '@pos-frontend/roles/data-access';
import { ViewGroupAuthoritiesComponent } from './view-group-authorities.component';

describe('ViewGroupAuthoritiesComponent', () => {
  let component: ViewGroupAuthoritiesComponent;
  let fixture: ComponentFixture<ViewGroupAuthoritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ViewGroupAuthoritiesComponent],
    providers: [
      provideRouter([]),
      {
        provide: GroupsFacade,
        useValue: { selectedGroup$: of(undefined), loaded$: of(false), getGroup: () => undefined, assignGroupRoles: () => undefined },
      },
      { provide: RolesFacade, useValue: { allRoles$: of([]), getAllRoles: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(ViewGroupAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
