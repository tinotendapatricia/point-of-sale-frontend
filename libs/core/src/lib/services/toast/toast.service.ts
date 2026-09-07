import { Injectable } from '@angular/core';
import iziToast, { IziToastSettings } from 'izitoast';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const DEFAULTS: IziToastSettings = {
  position: 'center',
  zindex: 99999,
  maxWidth: 450,
  timeout: 2000,
};

const FALLBACKS: Record<ToastType, { title: string; message: string }> = {
  success: { title: 'Success', message: 'Operation completed successfully' },
  error: { title: 'Error', message: 'Something went wrong. Please try again' },
  warning: { title: 'Caution', message: 'You forgot important data' },
  info: { title: 'Info', message: '' },
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  success(message?: string, options?: IziToastSettings) {
    this.show('success', message, options);
  }

  error(message?: string, options?: IziToastSettings) {
    this.show('error', message, options);
  }

  warning(message?: string, options?: IziToastSettings) {
    this.show('warning', message, options);
  }

  info(message?: string, options?: IziToastSettings) {
    this.show('info', message, options);
  }

  /** Kept for callers migrating off the old static helper. */
  displayToast(type: ToastType, message?: string) {
    this.show(type, message);
  }

  dismissAll() {
    iziToast.destroy();
  }

  private show(type: ToastType, message?: string, options?: IziToastSettings) {
    const fallback = FALLBACKS[type];

    iziToast[type]({
      ...DEFAULTS,
      title: fallback.title,
      message: message ?? fallback.message,
      ...options,
    });
  }
}