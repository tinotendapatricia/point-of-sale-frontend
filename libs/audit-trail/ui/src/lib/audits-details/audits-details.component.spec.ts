import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditsDetailsComponent } from './audits-details.component';

describe('AuditsDetailsComponent', () => {
  let component: AuditsDetailsComponent;
  let fixture: ComponentFixture<AuditsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AuditsDetailsComponent],
}).compileComponents();

    fixture = TestBed.createComponent(AuditsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
