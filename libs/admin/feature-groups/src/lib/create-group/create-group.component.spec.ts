import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GroupsFacade } from '@pos-frontend/groups/data-access';
import { CreateGroupComponent } from './create-group.component';

describe('CreateGroupComponent', () => {
  let component: CreateGroupComponent;
  let fixture: ComponentFixture<CreateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateGroupComponent],
    providers: [
      provideNoopAnimations(),
      { provide: GroupsFacade, useValue: { createNewGroup: () => undefined, loaded$: of(false) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
