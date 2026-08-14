import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchasesReportsContainerComponent } from './purchases-reports-container.component';

describe('PurchasesReportsContainerComponent', () => {
  let component: PurchasesReportsContainerComponent;
  let fixture: ComponentFixture<PurchasesReportsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasesReportsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
