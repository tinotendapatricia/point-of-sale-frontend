import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { StationStore } from '@pos-frontend/stations/data-access';
import { CreateStationComponent } from './create-station.component';

describe('CreateStationComponent', () => {
  let component: CreateStationComponent;
  let fixture: ComponentFixture<CreateStationComponent>;
  const store = { createLoading: () => false, createStation: jest.fn() };

  beforeEach(async () => {
    store.createStation.mockClear();
    await TestBed.configureTestingModule({
      imports: [CreateStationComponent],
      providers: [provideRouter([]), provideNoopAnimations(), { provide: StationStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends the form value to the store', () => {
    const el: HTMLElement = fixture.nativeElement;
    const type = (id: string, value: string) => {
      const input = el.querySelector<HTMLInputElement>('#' + id)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    type('station-account', '12');
    type('station-name', 'Till 12');
    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();
    expect(store.createStation).toHaveBeenCalledWith({
      data: { account: '12', name: 'Till 12', address: '', contact: '' },
      callback: expect.any(Function),
    });
  });
});
