import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DebtorsFormComponent } from './debtors-form.component';

describe('DebtorsFormComponent', () => {
  let component: DebtorsFormComponent;
  let fixture: ComponentFixture<DebtorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DebtorsFormComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(DebtorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
