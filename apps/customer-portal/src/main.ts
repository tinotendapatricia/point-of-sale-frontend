import '@cds/core/icon/register.js';
import { ClarityIcons } from '@cds/core/icon';
// @clr/angular vendors its own, incompatible (older-shaped) window.CDS global-state
// initializer, lazily triggered by its icon/layer services during Angular bootstrap.
// Touching @cds/core's own state getter here, before Angular starts, wins that race so
// window.CDS ends up with the shape @cds/core's own code expects everywhere else.
ClarityIcons.addIcons();

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
