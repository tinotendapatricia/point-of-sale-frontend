import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateGpReportComponent } from './generate-gp-report.component';

describe('GenerateGpReportComponent', () => {
  let component: GenerateGpReportComponent;
  let fixture: ComponentFixture<GenerateGpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GenerateGpReportComponent],
}).compileComponents();

    fixture = TestBed.createComponent(GenerateGpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
