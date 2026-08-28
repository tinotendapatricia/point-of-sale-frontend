import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@pos-frontend/auth/data-access';
import { PortalContainerComponent } from './portal-container/portal-container.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import '@cds/core/icon/register.js';
import {
  bankIcon,
  blocksGroupIcon,
  calendarIcon,
  ClarityIcons,
  cogIcon,
  dollarBillIcon,
  fileIcon,
  formIcon,
  gridViewIcon,
  homeIcon,
  libraryIcon,
  sliderIcon,
  userIcon,
  usersIcon,
  
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { CurrenciesDataAccessModule } from '@pos-frontend/currencies/data-access';

ClarityIcons.addIcons(
  userIcon,
  homeIcon,
  fileIcon,
  formIcon,
  gridViewIcon,
  usersIcon,
  calendarIcon,
  libraryIcon,
  sliderIcon,
  blocksGroupIcon,
  cogIcon,
  bankIcon,
  formIcon,
  dollarBillIcon,
  

);

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        ClarityModule,
        CurrenciesDataAccessModule,
        RouterModule.forChild([
            {
                path: 'auth',
                loadChildren: () => import('@pos-frontend/admin/feature-auth').then((module) => module.AdminFeatureAuthModule),
            },
            {
                path: '',
                component: PortalContainerComponent,
                canActivate: [AuthGuard],
                //resolve: [UserProfileResolverService],
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    {
                        path: 'dashboard',
                        loadChildren: () => import('@pos-frontend/admin/feature-dashboard').then((module) => module.AdminFeatureDashboardModule),
                    },
                    {
                        path: 'users',
                        loadChildren: () => import('@pos-frontend/admin/feature-users').then((module) => module.AdminFeatureUsersModule),
                    },
                    {
                        path: 'groups',
                        loadChildren: () => import('@pos-frontend/admin/feature-groups').then((module) => module.AdminFeatureGroupsModule),
                    },
                    {
                        path: 'configurations',
                        loadChildren: () => import('@pos-frontend/admin/feature-configurations').then((module) => module.AdminFeatureConfigurationsModule),
                    },
                    {
                        path: 'stock-take',
                        loadChildren: () => import('@pos-frontend/admin/feature-stock-take').then((module) => module.AdminFeatureStockTakeModule),
                    },
                    {
                        path: 'categories',
                        loadChildren: () => import('@pos-frontend/admin/feature-categories').then((module) => module.AdminFeatureCategoriesModule),
                    },
                    {
                        path: 'currencies',
                        loadChildren: () => import('@pos-frontend/admin/feature-currencies').then((module) => module.AdminFeatureCurrenciesModule),
                    },
                    {
                        path: 'company',
                        loadChildren: () => import('@pos-frontend/admin/feature-company').then((module) => module.AdminFeatureCompanyModule),
                    },
                    {
                        path: 'creditors',
                        loadChildren: () => import('@pos-frontend/admin/feature-creditors').then((module) => module.AdminFeatureCreditorsModule),
                    },
                    {
                        path: 'stations',
                        loadChildren: () => import('@pos-frontend/admin/feature-stations').then((module) => module.AdminFeatureStationsModule),
                    },
                    {
                        path: 'debtors',
                        loadChildren: () => import('@pos-frontend/admin/feature-debtors').then((module) => module.AdminFeatureDebtorsModule),
                    },
                    {
                        path: 'sales-reports',
                        loadChildren: () => import('@pos-frontend/admin/feature-sales-reports').then((module) => module.AdminFeatureSalesReportsModule),
                    },
                    {
                        path: 'stocks',
                        loadChildren: () => import('@pos-frontend/admin/feature-stock-reports').then((module) => module.AdminFeatureStockReportsModule),
                    },
                    {
                        path: 'products',
                        loadChildren: () => import('@pos-frontend/admin/feature-products').then((module) => module.AdminFeatureProductsModule),
                    },
                    {
                        path: 'receive-products',
                        loadChildren: () => import('@pos-frontend/admin/feature-goods-received').then((module) => module.AdminFeatureGoodsReceivedModule),
                    },
                    {
                        path: 'purchases-reports',
                        loadChildren: () => import('@pos-frontend/admin/feature-purchases-reports').then((module) => module.AdminFeaturePurchasesReportsModule),
                    },
                    {
                        path: 'audits',
                        loadChildren: () => import('@pos-frontend/admin/feature-audits').then((module) => module.AdminFeatureAuditsModule),
                    },
                    {
                        path: 'creditors',
                        loadChildren: () => import('@pos-frontend/admin/feature-creditors').then((module) => module.AdminFeatureCreditorsModule),
                    },
                    {
                        path: 'purchase-orders',
                        loadChildren: () => import('@pos-frontend/admin/feature-purchase-orders').then((module) => module.AdminFeaturePurchaseOrdersModule),
                    },
                    {
                        path: 'vat',
                        loadChildren: () => import('@pos-frontend/admin/feature-vat').then((module) => module.AdminFeatureVatModule),
                    },
                ],
            },
        ]),
        PortalContainerComponent, HeaderComponent, SideNavComponent,
    ],
})
export class AdminFeatureShellModule {}
