import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDebtorsComponent } from './create-debtors.component';

describe('CreateDebtorsComponent', () => {
  let component: CreateDebtorsComponent;
  let fixture: ComponentFixture<CreateDebtorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDebtorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
