import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { VatFormComponent } from './vat-form.component';

describe('VatFormComponent', () => {
  let component: VatFormComponent;
  let fixture: ComponentFixture<VatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VatFormComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(VatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
