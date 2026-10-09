import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReportNavComponent } from './report-nav.component';

describe('ReportNavComponent', () => {
  let fixture: ComponentFixture<ReportNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportNavComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportNavComponent);
    fixture.componentRef.setInput('items', [
      { path: 'summary', label: 'Summary', description: 'Totals for a period' },
      { path: 'detailed', label: 'Detailed', description: 'Every line for a period' },
    ]);
    fixture.detectChanges();
  });

  it('renders a link per report', () => {
    const links = fixture.nativeElement.querySelectorAll<HTMLAnchorElement>('a');
    expect([...links].map((a) => a.querySelector('.report-label')?.textContent)).toEqual(['Summary', 'Detailed']);
    expect(links[0].textContent).toContain('Totals for a period');
    expect(links[0].getAttribute('href')).toBe('/summary');
  });
});
