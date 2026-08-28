import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyDetailsUiComponent } from './company-details-ui.component';

describe('CompanyDetailsUiComponent', () => {
  let component: CompanyDetailsUiComponent;
  let fixture: ComponentFixture<CompanyDetailsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CompanyDetailsUiComponent],
}).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
