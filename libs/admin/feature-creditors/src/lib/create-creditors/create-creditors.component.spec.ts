import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCreditorsComponent } from './create-creditors.component';

describe('CreateCreditorsComponent', () => {
  let component: CreateCreditorsComponent;
  let fixture: ComponentFixture<CreateCreditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCreditorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCreditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
