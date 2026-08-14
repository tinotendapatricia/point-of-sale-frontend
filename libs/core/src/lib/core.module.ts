import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { AuthDataAccessModule } from '@pos-frontend/auth/data-access';
//import { LicenseInterceptorService } from './services/license-interceptor.service';

@NgModule({
  imports: [AuthDataAccessModule],
  providers: [
   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'Core Module is already loaded. Import it in the AppModule only'
      );
    }
  }
}
