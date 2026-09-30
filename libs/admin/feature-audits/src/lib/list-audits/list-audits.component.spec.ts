import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuditStore } from '@pos-frontend/audit-trail/data-access';
import { ListAuditsComponent } from './list-audits.component';

describe('ListAuditsComponent', () => {
  let component: ListAuditsComponent;
  let fixture: ComponentFixture<ListAuditsComponent>;
  const store = {
    paginatedAudits: () => [],
    totalAudits: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedAudits: jest.fn(),
  };

  beforeEach(async () => {
    store.getPaginatedAudits.mockClear();
    await TestBed.configureTestingModule({
      imports: [ListAuditsComponent],
      providers: [provideNoopAnimations(), { provide: AuditStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedAudits).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
