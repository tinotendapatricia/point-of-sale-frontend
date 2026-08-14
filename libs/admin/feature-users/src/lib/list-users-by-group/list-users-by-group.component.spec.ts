import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersByGroupComponent } from './list-users-by-group.component';

describe('ListUsersByGroupComponent', () => {
  let component: ListUsersByGroupComponent;
  let fixture: ComponentFixture<ListUsersByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUsersByGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
