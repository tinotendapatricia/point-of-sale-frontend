import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { BreakBulkFormComponent } from './break-bulk-form.component';

describe('BreakBulkFormComponent', () => {
  let component: BreakBulkFormComponent;
  let fixture: ComponentFixture<BreakBulkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BreakBulkFormComponent],
    providers: [provideNoopAnimations()],
})
    .compileComponents();

    fixture = TestBed.createComponent(BreakBulkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
