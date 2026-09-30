import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry, throwError } from 'rxjs';

import { ToastService } from './toast/toast.service';

const NOT_AUTHORIZED = 'Sorry, you are not authorized to perform this action.';
const TECHNICAL_ISSUE =
  'Sorry, there were some technical issues while processing your request. Please try again, or contact support.';

/** Reads `error.message` from a backend error body, if there is one. */
function backendMessage(error: HttpErrorResponse): string | undefined {
  const body: unknown = error.error;
  if (body && typeof body === 'object' && 'message' in body) {
    const { message } = body;
    return typeof message === 'string' && message ? message : undefined;
  }
  return undefined;
}

/**
 * Attaches the session token and licence key, and turns HTTP errors into
 * toasts. A 401 clears the session and returns to the login page. It does not
 * depend on auth/data-access, which itself depends on core.
 */
export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  const token = sessionStorage.getItem('accessToken');
  const license = sessionStorage.getItem('license');
  const setHeaders: Record<string, string> = {};
  if (token) {
    setHeaders['Authorization'] = `Bearer ${token}`;
  }
  if (license) {
    setHeaders['Key'] = `Bearer ${license}`;
  }

  return next(request.clone({ setHeaders })).pipe(
    retry(1),
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const message = backendMessage(error);
        switch (error.status) {
          case 401:
            toast.error(message ?? NOT_AUTHORIZED);
            sessionStorage.clear();
            void router.navigate(['auth', 'login']);
            break;
          case 403:
          case 405:
            toast.info(message ?? NOT_AUTHORIZED);
            break;
          case 404:
            toast.error(message ?? NOT_AUTHORIZED);
            break;
          default:
            toast.error(message ?? TECHNICAL_ISSUE);
        }
      }
      return throwError(() => error);
    })
  );
};
