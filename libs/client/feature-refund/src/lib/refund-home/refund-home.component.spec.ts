import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefundHomeComponent } from './refund-home.component';

describe('RefundHomeComponent', () => {
  let component: RefundHomeComponent;
  let fixture: ComponentFixture<RefundHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RefundHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
