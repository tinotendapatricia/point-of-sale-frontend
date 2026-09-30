import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { StationsEntity } from '@pos-frontend/stations/data-access';
import { StationsListUiComponent } from './stations-list-ui.component';

describe('StationsListUiComponent', () => {
  let component: StationsListUiComponent;
  let fixture: ComponentFixture<StationsListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsListUiComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(StationsListUiComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('stations', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a row per station and emits the id on edit', () => {
    const station: StationsEntity = { id: 4, number: 7, name: 'Till 7', createdAt: '', updatedAt: '' };
    fixture.componentRef.setInput('stations', [station]);
    fixture.detectChanges();
    const edited = jest.fn();
    component.edited.subscribe(edited);
    fixture.nativeElement.querySelector('button[aria-label="Update station"]').click();
    expect(edited).toHaveBeenCalledWith(4);
  });
});
