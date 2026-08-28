import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StationsFormComponent } from './stations-form.component';

describe('StationsFormComponent', () => {
  let component: StationsFormComponent;
  let fixture: ComponentFixture<StationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StationsFormComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(StationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
