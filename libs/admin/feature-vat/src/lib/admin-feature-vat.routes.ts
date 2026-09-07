import { Routes } from '@angular/router';
import { ViewVatComponent } from './view-vat/view-vat.component';
import { provideVatDataAccess } from '@pos-frontend/vat/data-access';

export const ADMIN_FEATURE_VAT_ROUTES: Routes = [
  {
    path: '',
    component: ViewVatComponent,
    providers: [provideVatDataAccess()],
  },
];
