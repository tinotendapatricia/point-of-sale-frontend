import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllSalesReportsComponent } from './all--sales-reports.component';

describe('AllSalesReportsComponent', () => {
  let component: AllSalesReportsComponent;
  let fixture: ComponentFixture<AllSalesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AllSalesReportsComponent],
}).compileComponents();

    fixture = TestBed.createComponent(AllSalesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
