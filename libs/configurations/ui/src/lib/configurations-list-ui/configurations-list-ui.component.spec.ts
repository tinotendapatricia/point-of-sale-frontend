import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationsListUiComponent } from './configurations-list-ui.component';

describe('ConfigurationsListUiComponent', () => {
  let component: ConfigurationsListUiComponent;
  let fixture: ComponentFixture<ConfigurationsListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationsListUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationsListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
