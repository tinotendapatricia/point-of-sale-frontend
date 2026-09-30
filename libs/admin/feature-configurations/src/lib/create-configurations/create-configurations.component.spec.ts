import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { DrawerRef } from '@pos-frontend/core';
import { CreateConfigurationsComponent } from './create-configurations.component';

describe('CreateConfigurationsComponent', () => {
  let component: CreateConfigurationsComponent;
  let fixture: ComponentFixture<CreateConfigurationsComponent>;
  const store = { createLoading: () => false, createConfiguration: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateConfigurationsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ConfigurationStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closes the drawer on cancel', () => {
    fixture.nativeElement.querySelector('button[type=button]').click();
    expect(drawerRef.close).toHaveBeenCalledWith(false);
  });
});
