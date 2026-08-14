import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashupFormComponent } from './cashup-form.component';

describe('CashupFormComponent', () => {
  let component: CashupFormComponent;
  let fixture: ComponentFixture<CashupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashupFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CashupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
