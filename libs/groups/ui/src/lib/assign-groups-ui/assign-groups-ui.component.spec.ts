import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AssignGroupsUiComponent } from './assign-groups-ui.component';

describe('AssignGroupsUiComponent', () => {
  let component: AssignGroupsUiComponent;
  let fixture: ComponentFixture<AssignGroupsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AssignGroupsUiComponent],
    providers: [provideRouter([])],
}).compileComponents();

    fixture = TestBed.createComponent(AssignGroupsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
