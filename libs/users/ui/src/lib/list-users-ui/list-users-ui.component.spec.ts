import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ListUsersUiComponent } from './list-users-ui.component';

describe('ListUsersUiComponent', () => {
  let component: ListUsersUiComponent;
  let fixture: ComponentFixture<ListUsersUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsersUiComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
