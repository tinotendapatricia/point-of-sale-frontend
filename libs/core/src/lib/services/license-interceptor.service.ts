import { type HttpInterceptorFn } from '@angular/common/http';

/**
 * Adds the licence key header on its own. `tokenInterceptor` already does
 * this, so only use it where the token interceptor isn't registered.
 */
export const licenseInterceptor: HttpInterceptorFn = (request, next) => {
  const license = sessionStorage.getItem('license');
  return next(
    license ? request.clone({ setHeaders: { KEY: `Bearer ${license}` } }) : request
  );
};
