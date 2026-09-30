import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { AuditsDetailsComponent } from './audits-details.component';

describe('AuditsDetailsComponent', () => {
  let fixture: ComponentFixture<AuditsDetailsComponent>;
  const audit: AuditsEntity = {
    id: 1,
    name: 'CREATE_PRODUCT',
    actionedBy: 'admin',
    resource: { productName: 'Bread', password: 'secret', id: 9 },
    createdAt: new Date('2024-01-01'),
    updatedAt: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditsDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditsDetailsComponent);
    fixture.componentRef.setInput('audit', audit);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows resource fields but hides sensitive ones', () => {
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Product Name');
    expect(text).toContain('Bread');
    expect(text).not.toContain('secret');
  });
});
