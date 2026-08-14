import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { UsersEntity, UsersFacade } from '@pos-frontend/users/data-access';

@Component({
  selector: 'pos-frontend-change-user-status',
  templateUrl: './change-user-status.component.html',
  styleUrls: ['./change-user-status.component.scss'],
})
export class ChangeUserStatusComponent implements OnInit, OnDestroy {
  @Input() user!: UsersEntity;
  @Output() closeModal = new EventEmitter<boolean>();
  sub = new Subscription();
  public btnState = ClrLoadingState.DEFAULT;

  constructor(private usersFacade: UsersFacade) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.usersFacade.changeUserStatus({
      userId: this.user.id,
      status: !this.user.enabled,
    });
    this.sub = this.usersFacade.loaded$.subscribe((res) =>
      res ? this.closeModal.emit(true) : null
    );
  }
}
