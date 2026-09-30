import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { StationsEntity } from '@pos-frontend/stations/data-access';
import { StationsFormComponent } from './stations-form.component';

describe('StationsFormComponent', () => {
  let component: StationsFormComponent;
  let fixture: ComponentFixture<StationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(StationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not emit while required fields are empty', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the edited station', () => {
    const station: StationsEntity = { id: 1, number: 3, name: 'Till 3', createdAt: '', updatedAt: '' };
    fixture.componentRef.setInput('station', station);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({ account: '3', name: 'Till 3', address: '', contact: '' });
  });
});
