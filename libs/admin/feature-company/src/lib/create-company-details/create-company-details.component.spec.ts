import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCompanyDetailsComponent } from './create-company-details.component';

describe('CreateCompanyDetailsComponent', () => {
  let component: CreateCompanyDetailsComponent;
  let fixture: ComponentFixture<CreateCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCompanyDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
