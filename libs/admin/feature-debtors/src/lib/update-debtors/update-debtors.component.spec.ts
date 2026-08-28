import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateDebtorsComponent } from './update-debtors.component';

describe('UpdateDebtorsComponent', () => {
  let component: UpdateDebtorsComponent;
  let fixture: ComponentFixture<UpdateDebtorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateDebtorsComponent],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
