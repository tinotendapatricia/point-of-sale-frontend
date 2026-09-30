import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { AuditsEntity } from '@pos-frontend/audit-trail/data-access';
import { ListAuditsUiComponent } from './list-audits-ui.component';

describe('ListAuditsUiComponent', () => {
  let component: ListAuditsUiComponent;
  let fixture: ComponentFixture<ListAuditsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAuditsUiComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAuditsUiComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('audits', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the row when details are requested', () => {
    const audit: AuditsEntity = {
      id: 1,
      name: 'LOGIN',
      actionedBy: 'admin',
      resource: {},
      createdAt: new Date('2024-01-01'),
      updatedAt: '',
    };
    fixture.componentRef.setInput('audits', [audit]);
    fixture.detectChanges();
    const viewed = jest.fn();
    component.viewed.subscribe(viewed);
    fixture.nativeElement.querySelector('button[aria-label="View details"]').click();
    expect(viewed).toHaveBeenCalledWith(audit);
  });
});
