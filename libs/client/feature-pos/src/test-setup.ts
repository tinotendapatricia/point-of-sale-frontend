import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {
      // jsdom polyfill: no-op
    }
    unobserve() {
      // jsdom polyfill: no-op
    }
    disconnect() {
      // jsdom polyfill: no-op
    }
  };
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = class IntersectionObserver {
    observe() {
      // jsdom polyfill: no-op
    }
    unobserve() {
      // jsdom polyfill: no-op
    }
    disconnect() {
      // jsdom polyfill: no-op
    }
  };
}
