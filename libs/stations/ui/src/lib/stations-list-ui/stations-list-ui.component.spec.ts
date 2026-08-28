import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationsListUiComponent } from './stations-list-ui.component';

describe('StationsListUiComponent', () => {
  let component: StationsListUiComponent;
  let fixture: ComponentFixture<StationsListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StationsListUiComponent],
}).compileComponents();

    fixture = TestBed.createComponent(StationsListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
