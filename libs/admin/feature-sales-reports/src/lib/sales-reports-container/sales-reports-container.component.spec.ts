import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesReportsContainerComponent } from './sales-reports-container.component';

describe('SalesReportsContainerComponent', () => {
  let component: SalesReportsContainerComponent;
  let fixture: ComponentFixture<SalesReportsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesReportsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
