import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersUiComponent } from './list-users-ui.component';

describe('ListUsersUiComponent', () => {
  let component: ListUsersUiComponent;
  let fixture: ComponentFixture<ListUsersUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUsersUiComponent ]
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
