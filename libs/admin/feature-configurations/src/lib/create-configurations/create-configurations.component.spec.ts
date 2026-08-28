import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateConfigurationsComponent } from './create-configurations.component';

describe('CreateConfigurationsComponent', () => {
  let component: CreateConfigurationsComponent;
  let fixture: ComponentFixture<CreateConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateConfigurationsComponent],
}).compileComponents();

    fixture = TestBed.createComponent(CreateConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
