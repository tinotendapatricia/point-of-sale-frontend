import { type Routes } from '@angular/router';
import { providePosDataAccess } from '@pos-frontend/pos/data-access';
import { RefundHomeComponent } from './refund-home/refund-home.component';

export const CLIENT_FEATURE_REFUND_ROUTES: Routes = [
  {
    path: '',
    component: RefundHomeComponent,
    providers: [providePosDataAccess()],
  },
];
