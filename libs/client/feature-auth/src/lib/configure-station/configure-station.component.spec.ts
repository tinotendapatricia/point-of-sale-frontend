import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigureStationComponent } from './configure-station.component';

describe('ConfigureStationComponent', () => {
  let component: ConfigureStationComponent;
  let fixture: ComponentFixture<ConfigureStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ConfigureStationComponent],
}).compileComponents();

    fixture = TestBed.createComponent(ConfigureStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
