import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditorsDetailsComponent } from './creditors-details.component';

describe('CreditorsDetailsComponent', () => {
  let component: CreditorsDetailsComponent;
  let fixture: ComponentFixture<CreditorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreditorsDetailsComponent],
}).compileComponents();

    fixture = TestBed.createComponent(CreditorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
