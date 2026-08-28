import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCostComponent } from './update-cost.component';

describe('UpdateCostComponent', () => {
  let component: UpdateCostComponent;
  let fixture: ComponentFixture<UpdateCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateCostComponent],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
