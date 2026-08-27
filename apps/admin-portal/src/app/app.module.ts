import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from '@pos-frontend/core';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ClarityModule } from '@clr/angular';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        ClarityModule,
        NgSelectModule,
        RouterModule.forRoot([
            {
                path: '',
                loadChildren: () => import('@pos-frontend/admin/feature-shell').then((mod) => mod.AdminFeatureShellModule),
            },
        ], { initialNavigation: 'enabledBlocking' }),
        CoreModule,
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionWithinNgZone: true,
                strictActionTypeUniqueness: true,
            },
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: !environment.production,
            connectInZone: true
        }),
        EffectsModule.forRoot([])], providers: [
        { provide: 'BaseUrl', useValue: environment.baseUrl },
        Title,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
    ] })
export class AppModule {}
