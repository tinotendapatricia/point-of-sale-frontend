import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationsFormComponent } from './configurations-form.component';

describe('ConfigurationsFormComponent', () => {
  let component: ConfigurationsFormComponent;
  let fixture: ComponentFixture<ConfigurationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
