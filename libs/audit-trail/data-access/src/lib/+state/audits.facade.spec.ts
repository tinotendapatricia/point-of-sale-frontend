import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { take, Observable } from 'rxjs';

function readFirst<T>(source: Observable<T>): Promise<T> {
  return new Promise((resolve) => {
    source.pipe(take(1)).subscribe(resolve);
  });
}

import * as AuditsActions from './audits.actions';
import { AuditsEffects } from './audits.effects';
import { AuditsFacade } from './audits.facade';
import { AuditsEntity } from './audits.models';
import {
  AUDITS_FEATURE_KEY,
  AuditsState,
  initialAuditsState,
  auditsReducer,
} from './audits.reducer';
import * as AuditsSelectors from './audits.selectors';

interface TestSchema {
  audits: AuditsState;
}

describe('AuditsFacade', () => {
  let facade: AuditsFacade;
  let store: Store<TestSchema>;
  const createAuditsEntity = (id: string, name = ''): AuditsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AUDITS_FEATURE_KEY, auditsReducer),
          EffectsModule.forFeature([AuditsEffects]),
        ],
        providers: [AuditsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuditsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAudits$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAudits$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAuditsSuccess` to manually update list
     */
    it('allAudits$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAudits$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AuditsActions.loadAuditsSuccess({
          audits: [createAuditsEntity('AAA'), createAuditsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allAudits$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
