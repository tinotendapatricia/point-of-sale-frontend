import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserStatusComponent } from './change-user-status.component';

describe('ChangeUserStatusComponent', () => {
  let component: ChangeUserStatusComponent;
  let fixture: ComponentFixture<ChangeUserStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
