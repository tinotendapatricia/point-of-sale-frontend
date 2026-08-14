import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateConfigurationsComponent } from './update-configurations.component';

describe('UpdateConfigurationsComponent', () => {
  let component: UpdateConfigurationsComponent;
  let fixture: ComponentFixture<UpdateConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateConfigurationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
