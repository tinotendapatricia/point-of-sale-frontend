import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ListGroupsUiComponent } from './list-groups-ui.component';

describe('ListGroupsUiComponent', () => {
  let component: ListGroupsUiComponent;
  let fixture: ComponentFixture<ListGroupsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGroupsUiComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListGroupsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
