import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RateFormComponent } from './rate-form.component';

describe('RateFormComponent', () => {
  let component: RateFormComponent;
  let fixture: ComponentFixture<RateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RateFormComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(RateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
