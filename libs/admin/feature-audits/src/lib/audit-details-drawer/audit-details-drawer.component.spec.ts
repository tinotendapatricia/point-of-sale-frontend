import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { DRAWER_DATA } from '@pos-frontend/core';
import { AuditDetailsDrawerComponent } from './audit-details-drawer.component';

describe('AuditDetailsDrawerComponent', () => {
  let fixture: ComponentFixture<AuditDetailsDrawerComponent>;
  const audit: AuditsEntity = {
    id: 1,
    name: 'LOGIN',
    actionedBy: 'admin',
    resource: { username: 'admin' },
    createdAt: new Date('2024-01-01'),
    updatedAt: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditDetailsDrawerComponent],
      providers: [{ provide: DRAWER_DATA, useValue: audit }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditDetailsDrawerComponent);
    fixture.detectChanges();
  });

  it('renders the audit resource from the drawer data', () => {
    expect(fixture.nativeElement.textContent).toContain('Username');
  });
});
