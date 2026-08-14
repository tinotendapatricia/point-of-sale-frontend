import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupsUiComponent } from './list-groups-ui.component';

describe('ListGroupsUiComponent', () => {
  let component: ListGroupsUiComponent;
  let fixture: ComponentFixture<ListGroupsUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListGroupsUiComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
