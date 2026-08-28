import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicenseSystemComponent } from './license-system.component';

describe('LicenseSystemComponent', () => {
  let component: LicenseSystemComponent;
  let fixture: ComponentFixture<LicenseSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LicenseSystemComponent],
}).compileComponents();

    fixture = TestBed.createComponent(LicenseSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
