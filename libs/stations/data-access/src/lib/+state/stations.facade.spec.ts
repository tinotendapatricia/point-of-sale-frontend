import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as StationsActions from './stations.actions';
import { StationsEffects } from './stations.effects';
import { StationsFacade } from './stations.facade';
import { StationsEntity } from './stations.models';
import {
  STATIONS_FEATURE_KEY,
  StationsState,
  initialStationsState,
  stationsReducer,
} from './stations.reducer';
import * as StationsSelectors from './stations.selectors';

interface TestSchema {
  stations: StationsState;
}

describe('StationsFacade', () => {
  let facade: StationsFacade;
  let store: Store<TestSchema>;
  const createStationsEntity = (id: string, name = ''): StationsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(STATIONS_FEATURE_KEY, stationsReducer),
          EffectsModule.forFeature([StationsEffects]),
        ],
        providers: [StationsFacade],
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
      facade = TestBed.inject(StationsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allStations$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allStations$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadStationsSuccess` to manually update list
     */
    it('allStations$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allStations$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        StationsActions.loadStationsSuccess({
          stations: [createStationsEntity('AAA'), createStationsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allStations$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
