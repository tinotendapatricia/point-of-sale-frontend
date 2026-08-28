import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersUiComponent } from './list-users-ui.component';

describe('ListUsersUiComponent', () => {
  let component: ListUsersUiComponent;
  let fixture: ComponentFixture<ListUsersUiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ListUsersUiComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
