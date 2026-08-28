import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebtorsFormComponent } from './debtors-form.component';

describe('DebtorsFormComponent', () => {
  let component: DebtorsFormComponent;
  let fixture: ComponentFixture<DebtorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DebtorsFormComponent],
}).compileComponents();

    fixture = TestBed.createComponent(DebtorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
