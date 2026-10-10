import { type Routes } from '@angular/router';
import { authGuard } from '@pos-frontend/auth/data-access';
import { PortalContainerComponent } from './portal-container/portal-container.component';

export const ADMIN_FEATURE_SHELL_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@pos-frontend/admin/feature-auth').then(
        (module) => module.ADMIN_FEATURE_AUTH_ROUTES
      ),
  },
  {
    path: '',
    component: PortalContainerComponent,
    canActivate: [authGuard],

     children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-dashboard').then(
            (module) => module.ADMIN_FEATURE_DASHBOARD_ROUTES
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-users').then(
            (module) => module.ADMIN_FEATURE_USERS_ROUTES
          ),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-roles').then(
            (module) => module.ADMIN_FEATURE_ROLES_ROUTES
          ),
      },
      /*{
        path: 'groups',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-groups').then(
            (module) => module.ADMIN_FEATURE_GROUPS_ROUTES
          ),
      },*/
      {
        path: 'stock-take',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-stock-take').then(
            (module) => module.ADMIN_FEATURE_STOCK_TAKE_ROUTES
          ),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-company').then(
            (module) => module.ADMIN_FEATURE_COMPANY_ROUTES
          ),
      },
      {
        path: 'creditors',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-creditors').then(
            (module) => module.ADMIN_FEATURE_CREDITORS_ROUTES
          ),
      },
      {
        path: 'debtors',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-debtors').then(
            (module) => module.ADMIN_FEATURE_DEBTORS_ROUTES
          ),
      },
      {
        path: 'sales-reports',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-sales-reports').then(
            (module) => module.ADMIN_FEATURE_SALES_REPORTS_ROUTES
          ),
      },
      {
        path: 'stocks',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-stock-reports').then(
            (module) => module.ADMIN_FEATURE_STOCK_REPORTS_ROUTES
          ),
      },
      {
        path: 'purchases-reports',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-purchases-reports').then(
            (module) => module.ADMIN_FEATURE_PURCHASES_REPORTS_ROUTES
          ),
      },
      {
        path: 'configurations',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-configurations').then(
            (module) => module.ADMIN_FEATURE_CONFIGURATIONS_ROUTES
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-products').then(
            (module) => module.ADMIN_FEATURE_PRODUCTS_ROUTES
          ),
      },
      {
        path: 'currencies',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-currencies').then(
            (module) => module.ADMIN_FEATURE_CURRENCIES_ROUTES
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-categories').then(
            (module) => module.ADMIN_FEATURE_CATEGORIES_ROUTES
          ),
      },
      {
        path: 'receive-products',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-goods-received').then(
            (module) => module.ADMIN_FEATURE_GOODS_RECEIVED_ROUTES
          ),
      },
      {
        path: 'audits',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-audits').then(
            (module) => module.ADMIN_FEATURE_AUDITS_ROUTES
          ),
      },
      {
        path: 'purchase-orders',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-purchase-orders').then(
            (module) => module.ADMIN_FEATURE_PURCHASE_ORDERS_ROUTES
          ),
      },
      /*{
        path: 'vat',
        loadChildren: () =>
          import('@pos-frontend/admin/feature-vat').then(
            (module) => module.ADMIN_FEATURE_VAT_ROUTES
          ),
      },*/
    ], 
  },
];
