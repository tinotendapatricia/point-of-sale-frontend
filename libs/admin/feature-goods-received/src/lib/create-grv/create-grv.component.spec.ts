import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGrvComponent } from './create-grv.component';

describe('CreateGrvComponent', () => {
  let component: CreateGrvComponent;
  let fixture: ComponentFixture<CreateGrvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateGrvComponent],
}).compileComponents();

    fixture = TestBed.createComponent(CreateGrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
